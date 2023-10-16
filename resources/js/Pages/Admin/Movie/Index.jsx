import Button from "@/Components/Button";
import FlashMessage from "@/Components/FlashMassage";
import Authenticated from "@/Layouts/Authenticated";
import { Link } from "@inertiajs/react";

export default function Index({ auth, flashMessage, movies, imageUrl }) {
    return (
        <Authenticated auth={auth}>
            <Link href={route("admin.dashboard.movie.create")}>
                <Button type="button" className="w-40 mb-8 mt-5">
                    Insert New Movie
                </Button>
            </Link>
            {flashMessage?.message && (
                <FlashMessage message={flashMessage.message} />
            )}
            <table className="table-fixed w-full text-center">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Rating</th>
                        <th colSpan={2}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map((movie) => (
                        <tr key={movie.id}>
                            <td>
                                <img
                                    src={`${imageUrl}/storage/movies/${movie.thumbnail}`}
                                    className="w-32 rounded-md"
                                />
                            </td>
                            <td>{movie.name}</td>
                            <td>{movie.category}</td>
                            <td>{movie.rating.toFixed(1)}</td>
                            <td>
                                <Button type="button" variant="warning">
                                    <Link
                                        href={route(
                                            "admin.dashboard.movie.edit",
                                            movie.id
                                        )}
                                    >
                                        Edit
                                    </Link>
                                </Button>
                            </td>
                            <td>
                                <Button type="button" variant="danger">
                                    <Link
                                        href={route(
                                            "admin.dashboard.movie.destroy",
                                            movie.id
                                        )}
                                    >
                                        Delete
                                    </Link>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Authenticated>
    );
}
