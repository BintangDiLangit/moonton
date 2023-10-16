import Label from "@/Components/Label";
import Authenticated from "@/Layouts/Authenticated";
import { Head, Link, useForm } from "@inertiajs/react";
import Input from "@/Components/Input";
import InputError from "@/Components/InputError";
import Checkbox from "@/Components/Checkbox";
import Button from "@/Components/Button";
import { Inertia } from "@inertiajs/inertia";

export default function Create({ auth, movie, imageUrl }) {
    const { data, setData, processing, errors } = useForm({
        ...movie,
    });

    const onHandleChange = (event) => {
        const { data, name, type, value, files } = event.target;

        let inputValue;

        if (type === "file") {
            inputValue = files[0];
        } else if (type === "url") {
            const isValidUrl = /^https?:\/\/\S+$/i.test(value);
            inputValue = isValidUrl ? value : null;
        } else {
            inputValue = value;
        }

        setData(name, inputValue);
    };

    const submit = (e) => {
        e.preventDefault();

        if (data.thumbnail === movie.thumbnail) {
            delete data.thumbnail;
        }

        console.log(data);
        Inertia.post(route("admin.dashboard.movie.update", movie.id), {
            _method: "PUT",
            ...data,
        });
    };
    return (
        <Authenticated auth={auth}>
            <Head title="Admin - Update Movie" />
            <h1 className="text-xl mt-5">Update Movie : {movie.name}</h1>
            <hr className="mb-4" />
            <form onSubmit={submit}>
                <Label forInput="name" value="Name" />
                <Input
                    type="text"
                    name="name"
                    variant="primary-outline"
                    defaultValue={movie.name}
                    handleChange={onHandleChange}
                    placeholder="Enter movie name"
                    className="bg-white rounded-[25px] outline outline-1 outline-[##fb6907]"
                />
                <InputError message={errors.name} className="mt-2" />
                <Label forInput="category" value="Category" className="mt-4" />
                <Input
                    type="text"
                    name="category"
                    variant="primary-outline"
                    defaultValue={movie.category}
                    handleChange={onHandleChange}
                    placeholder="Enter category"
                    className="bg-white rounded-[25px] outline outline-1 outline-[##fb6907]"
                />
                <InputError message={errors.category} className="mt-2" />
                <Label
                    forInput="video_url"
                    value="Video URL"
                    className="mt-4"
                />
                <Input
                    type="url"
                    name="video_url"
                    defaultValue={movie.video_url}
                    variant="primary-outline"
                    handleChange={onHandleChange}
                    placeholder="Enter video url of the movie"
                    className="bg-white rounded-[25px] outline outline-1 outline-[##fb6907]"
                />
                <InputError message={errors.video_url} className="mt-2" />
                <Label
                    forInput="thumbnail"
                    value="Thumbnail"
                    className="mt-4"
                />
                <img src={`${imageUrl}/storage/movies/${movie.thumbnail}`} />
                <Input
                    type="file"
                    name="thumbnail"
                    variant="primary-outline"
                    handleChange={onHandleChange}
                    placeholder="Insert thumbnail of the movie"
                    className="bg-white rounded-[25px] outline outline-1 outline-[##fb6907]"
                />
                <InputError message={errors.thumbnail} className="mt-2" />
                <Label forInput="rating" value="Rating" className="mt-4" />
                <Input
                    type="number"
                    name="rating"
                    variant="primary-outline"
                    defaultValue={movie.rating}
                    handleChange={onHandleChange}
                    placeholder="Enter rating of the movie"
                    className="bg-white rounded-[25px] outline outline-1 outline-[##fb6907]"
                />
                <InputError message={errors.rating} className="mt-2" />
                <div className="flex flex-row mt-4 items-center">
                    <Label
                        forInput="is_featured"
                        value="Is Featured"
                        className="mr-3 mt-1"
                    />
                    <Checkbox
                        name="is_featured"
                        handleChange={(e) =>
                            setData("is_featured", e.target.checked)
                        }
                        checked={movie.is_featured}
                    />
                </div>
                <Button
                    type="submit"
                    className="mt-4"
                    processing={processing}
                    variant="primary"
                >
                    Save
                </Button>
            </form>
        </Authenticated>
    );
}
