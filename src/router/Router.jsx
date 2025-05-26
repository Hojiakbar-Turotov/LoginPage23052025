import { createBrowserRouter } from "react-router-dom";

// Sahifalarni import qilish
import App from "../App"; // Umumiy layout (asosiy komponent)
import LoginPage from "../pages/login"; // Login sahifasi
import Users from "../pages/users";
import Dashboard from "../components/dashboard";
import Region from "../pages/region";
import { notifySuccess, notifyError } from "../pages/region/Toast";
import News from "../pages/news";

// Routerni yaratamiz
export const Router = createBrowserRouter([
    {
        path: "/login", // http://localhost:5173/login
        element: <LoginPage />, // Login sahifasini render qiladi
    },
    {
        path: "/", // Bosh sahifa (layout)
        element: <App />, // Asosiy layout (ichiga children yuklanadi)
        children: [
            {
                index: true, // http://localhost:5173/ (asosiy sahifa)
                element: <Dashboard />, // Dashboard komponenti
            },
            {
                path: "users", // http://localhost:5173/users
                element: <Users />, // Users sahifasi
            },
            {
                path: "region", // http://localhost:5173/region
                element: <Region notifySuccess={notifySuccess} notifyError={notifyError} />, // Region sahifasi
            },
            {
                path: "news", // http://localhost:5173/region
                element: <News />, // Region sahifasi
            },
        ],
    },
]);
