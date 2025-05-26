import { NavLink, Outlet, useNavigate } from 'react-router-dom'

export default function Home({ title = "Admin Panel" }) {
    const navigate = useNavigate()

    const logOut = () => {
        localStorage.removeItem("token")
        navigate("/login")
    }

    const navLinkClass = ({ isActive }) =>
        `px-4 py-2 rounded hover:bg-gray-200 ${isActive ? 'bg-blue-100 text-blue-600 font-semibold' : 'text-gray-700'}`

    return (
        <div className="bg-gray-100 min-h-screen">
            <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
                <h1 className="text-xl font-bold">{title}</h1>
                <button
                    onClick={logOut}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                    Log Out
                </button>
            </header>

            <div className="flex min-h-[calc(100vh-64px)]">
                {/* Sidebar */}
                <aside className="w-64 bg-white border-r p-4 flex flex-col gap-2">
                    <NavLink to="/" className={navLinkClass}>
                        Dashboard
                    </NavLink>
                    <NavLink to="/users" className={navLinkClass}>
                        Users
                    </NavLink>
                    <NavLink to="/region" className={navLinkClass}>
                        Region
                    </NavLink>
                    <NavLink to="/news" className={navLinkClass}>
                        News
                    </NavLink>
                </aside>

                {/* Main content */}
                <main className="flex-1 p-6 bg-white rounded-md m-4 shadow">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
