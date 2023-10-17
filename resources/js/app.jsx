import "./bootstrap";
import "../css/app.css";

import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import React from "react";
import Meta from "./Components/Meta";

const appName = import.meta.env.VITE_APP_NAME || "Moonton";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <React.Fragment>
                <Meta />
                <App {...props} />
            </React.Fragment>
        );
    },
    progress: {
        color: "#4B5563",
    },
});
