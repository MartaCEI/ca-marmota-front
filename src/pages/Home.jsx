import { useEffect } from "react";
import { HomeSectionsHorizontal } from "@/components/HomeSectionsHorizontal";
import { HomeSectionsVertical } from "@/components/HomeSectionsVertical";
import { usePageInfo } from "@/hooks/usePageInfo";

const Home = () => {
    const { VITE_BACKEND_URL } = import.meta.env;
    const { pageInfo, fetchPageInfo, error } = usePageInfo(); // Extraer pageInfo y error del contexto

    useEffect(() => {
        fetchPageInfo("home"); // Llamada para cargar la información de la página "home"
    }, [fetchPageInfo]);

    const info = pageInfo; // Renombramos pageInfo para usar info en el componente

    return (
        <>
            <div className="Home-header">
                <img
                    className="Home-header-img"
                    src={`${VITE_BACKEND_URL}/img/${info.image}`}
                    alt={info.image || "Header"}
                />
                <img
                    className="Home-header-logo"
                    src={`${VITE_BACKEND_URL}/img/${info.logo}`}
                    alt={info.logo || "Logo"}
                />
            </div>
            <section className="Section-home">
                <h1 className="Section-home-h1">{info.title}</h1>
                <p className="Section-home-p">{info.subtitle}</p>
            </section>
            <div className="Vertical-line"></div>
            
            {error ? (
                <p>{error}</p>
            ) : (
                info.articles && info.articles.length > 0 ? (
                    info.articles.map((article, index) => (
                        <div key={index}>
                            {index % 2 === 0 ? (
                                <article className="Section-horizontal">
                                    <HomeSectionsHorizontal article={article} />
                                </article>
                            ) : (
                                <article className="Section-vertical">
                                    <HomeSectionsVertical article={article} />
                                </article>
                            )}
                        </div>
                    ))
                ) : (
                    <p>No sections available.</p>
                )
            )}
        </>
    );
};

export default Home;
