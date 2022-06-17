import AddModalClient from "../components/AddClientModal";
import Projects from "../components/Projects";
import Clients from "../components/Clients";

export default function Home() {
    return (
        <>
            <div className="d-flex gap-3 mb-4">
                <AddModalClient />
            </div>
            <Projects />
            <hr />
            <Clients />
        </>
    );
}
