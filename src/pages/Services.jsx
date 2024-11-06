import { useState, useEffect } from "react";
import { HomeSectionsHorizontal } from "@/components/HomeSectionsHorizontal";
import { HomeSectionsVertical } from "@/components/HomeSectionsVertical";

const Home = () => {
    const { VITE_API_URL } = import.meta.env;
    const [error, setError] = useState('');
    const [info, setInfo] = useState({
        headerImage: "",
        logo: "",
        title: "",
        subtitle: "",
        sections: []
    });

    useEffect(() => {
        fetchHomeData();
    }, []);

    const fetchHomeData = async () => {
        try {
            const response = await fetch(`${VITE_API_URL}/home`);
            const objeto = await response.json();
            console.log("Datos recibidos:", objeto);
            if (objeto.status === "error") {
                setError(`Tuvimos un error: ${objeto.msg}`);
                return;
            }
            // Accede a data[0] y asigna el contenido directamente a info
            setInfo(objeto.data[0]);
        } catch (error) {
            if (error.name !== 'AbortError') {
                console.log("Error al hacer el fetch de los datos:", error);
                setError("Error al cargar los datos");
            }
        }
    };

    return (
        <>
            <header>
                <img src={info.headerImage} alt="Header" />
                <img src={info.logo} alt="Logo" />
                <h1>{info.title}</h1>
                <h2>{info.subtitle}</h2>
            </header>
            <h1>Usuarios</h1>
            <p>Admin admin@mail.com 1111</p>
            <p>marta marta@gmail.com 1234</p>
            {error ? (
                <p>{error}</p>
            ) : (
                info.sections.map((section, index) => (
                    <div key={section.index}>
                        {index % 2 === 0 ? (
                            <section className="Section-vertical">
                                <HomeSectionsVertical section={section} />
                            </section>
                        ) : (
                            <section className="Section-horizontal">
                                <HomeSectionsHorizontal section={section} />
                            </section>
                        )}
                    </div>
                ))
            )}
        </>
    );
};

export default Home;