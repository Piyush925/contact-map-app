import { useLocation } from "react-router-dom";

function Header() {
    const location = useLocation();

    return (
        <header className="flex border bg-blue-400  p-2 rounded">
            <div className="flex-1 flex justify-center text-2xl font-medium">
                {location.pathname === "/contacts" && "Contact Page"}
                {location.pathname === "/charts-and-maps" && "Chart and Maps"}
            </div>
        </header>
    );
}

export default Header;