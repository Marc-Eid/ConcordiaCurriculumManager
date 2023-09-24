import React from "react";
import ReactDOM from "react-dom/client";
import { WrappedApp } from "./App.tsx";
import "./index.css";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.headers.post["Content-Type"] = "application/x.ccm.authentication+json;v=1";
axios.defaults.headers.put["charset"] = "utf-8";
axios.defaults.headers.common["Accept"] = "application/x.ccm.authentication.token+json;v=1";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <WrappedApp />
    </React.StrictMode>
);
