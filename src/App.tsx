import { Navigate, Route, Routes } from "react-router-dom";
import Contacts from "./components/Contact/Contact";
import ChartsAndMaps from "./components/ChartsMap/index";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";

function App() {
    return (
        <main className="bg-gray-50">
            <section className="h-screen flex">
                <Sidebar />
                <section className="border-x flex-1">
                    <Header/> 
                    <Routes>
                        <Route path="/" index element={<Navigate to="/contacts" />} />
                        <Route path="/contacts" element={<Contacts />} />
                        <Route path="/charts-and-maps" element={<ChartsAndMaps />} />
                    </Routes>
                </section>
            </section>
        </main>
    );
}

export default App;