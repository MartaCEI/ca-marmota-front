import { useState, useEffect } from "react";
import { HomeSections } from "@/components/HomeSections"; 

const Home = () => {
    const { VITE_API_URL } = import.meta.env;
    const [error, setError] = useState('');
    const [info, setInfo] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`${VITE_API_URL}/home`);
            const objeto = await response.json();
            if (objeto.status === "error") {
                setError(`Tuvimos un error: ${objeto.msg}`);
                return;
            }
            console.log("Datos recibidos:", objeto.data); // Verifica la estructura aquí
            setInfo(Array.isArray(objeto.data) ? objeto.data : []); // Asegura que sea un array
        } catch (error) {
            if (error.name !== 'AbortError') {
                console.log("Error al hacer el fetch de los datos:", error);
                setError("Error al cargar los datos");
            }
        }
    }

    return (
        <>
            <h1>Home</h1>
            <h1>Usuarios</h1>
            <p>Admin admin@mail.com 1111</p>
            <p>marta marta@gmail.com 1234</p>
            {error ? (
                <p>{error}</p>
            ) : (
                info.length > 0 ? (
                    info.map((item, index) => (
                        <section className="Section" key={index}>
                            <HomeSections {...item} />
                        </section>
                    ))
                ) : (
                    <p>No hay datos disponibles.</p>
                )
            )}
        </>
    );
}

export default Home;
