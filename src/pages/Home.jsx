import { useState, useEffect } from "react";
import { HomeSectionsHorizontal } from "@/components/HomeSectionsHorizontal";
import { HomeSectionsVertical } from "@/components/HomeSectionsVertical";

const Home = () => {
    const { VITE_API_URL, VITE_BACKEND_URL } = import.meta.env;
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
            <div className="Home-header">
                <img className="Home-header-img" src={`${VITE_BACKEND_URL}/img/${info.headerImage}`} alt={info.headerImage} />
                <img className="Home-header-logo" src={`${VITE_BACKEND_URL}/img/${info.logo}`} alt={info.logo} />
            </div>
            <section className="Section-home">
                <h1 className="Section-home-h1">{info.title}</h1>
                <p className="Section-home-p">{info.subtitle}</p>
            </section>
            <div className="Vertical-line"></div>
            
            {error ? (
                <p>{error}</p>
            ) : (
                info.sections.map((section, index) => (
                    <div key={section.index}>
                        {index % 2 === 0 ? (
                            <section className="Section-horizontal">
                                <HomeSectionsHorizontal section={section} />
                            </section>
                        ) : (
                            <section className="Section-vertical">
                                <HomeSectionsVertical section={section} />
                            </section>
                        )}
                    </div>
                ))
            )}
            {/* <div className="Vertical-line"></div> */}
        </>
    );
};

export default Home;
