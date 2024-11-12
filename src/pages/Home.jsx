import { useEffect } from "react";
import { HomeSectionsHorizontal } from "@/components/HomeSectionsHorizontal";
import { HomeSectionsVertical } from "@/components/HomeSectionsVertical";
import { usePageInfo } from "@/hooks/usePageInfo";
import Introduction from "@/components/Introduction";

const Home = () => {
    
    const { pageInfo, fetchPageInfo, error } = usePageInfo(); // Extraer pageInfo y error del contexto
    const pagina = "home"; // Definir la página actual

    useEffect(() => {
        fetchPageInfo(pagina); // Llamada para cargar la información de la página "home"
    }, [fetchPageInfo, pagina]);

    return (
        <>
            {pageInfo && <Introduction {...pageInfo} />}

            {error ? (
                <p>{error}</p>
            ) : (
                pageInfo.articles && pageInfo.articles.length > 0 ? (
                    pageInfo.articles.map((article, index) => (
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
                    <p>Información no disponible.</p>
                )
            )}
        </>
    );
};

export default Home;
