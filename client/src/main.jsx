import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import File from "./pages/File.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}></Route>
            <Route path="/:id" element={<File />}></Route>
        </Routes>
    </BrowserRouter>
);
