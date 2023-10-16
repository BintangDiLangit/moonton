import Button from "@/Components/Button";
import FlashMessage from "@/Components/FlashMassage";
import Authenticated from "@/Layouts/Authenticated";
import { Link } from "@inertiajs/react";

export default function Index({ auth, flashMessage }) {
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
        </Authenticated>
    );
}
