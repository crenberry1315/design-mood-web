import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
const { default: App } =
  import.meta.env.MODE === "admin"
    ? await import("./admin/AdminApp.jsx")
    : await import("./App.jsx");
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
