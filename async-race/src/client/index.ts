import "./index.scss";
import "bootstrap/js/dist/collapse";

import App from "./app/App";

const app = new App();

const root = document.body as HTMLBodyElement;

if (!root) throw new Error("Root container not load");

root.classList.add("d-flex", "flex-column", "h-100");
root.innerHTML = app.render();
app.addEvents();
