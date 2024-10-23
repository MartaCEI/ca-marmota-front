import { useState, useEffect } from "react";
import { HomeSections } from "@/components/HomeSections"; 
const URL = import.meta.env.VITE_API_URL;

const Services = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [info, setInfo] = useState({});

useEffect(() => {
    fetchData();
}, []);

const fetchData = async () => {
    setLoading(true);
    try {
        const response = await fetch(`${URL}/home`);
        const objeto = await response.json();
        if (objeto.status === "error") {
            setError(`Tuvimos un error: ${objeto.msg}`);
            return;
        }
        setInfo(objeto.data);

    } catch (error) {
        if (error.name !== 'AbortError') {
            console.log("Error al hacer el fetch de los datos:", error);
            setError("Error al cargar los datos");
        }
    } finally {
        setLoading(false);
    }
}

return (
    <>
        <h1>Home</h1>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && info.map((item, index) => (
            <section className="Section" key={index}>
                <HomeSections {...item} />
            </section>
        ))}
    </>
);
}


export default Services;