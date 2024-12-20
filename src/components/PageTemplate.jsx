import React, { useEffect } from "react";
import { usePageInfo } from "../hooks/usePageInfo"; // Asume que este hook ya está definido
import Introduction from "./Introduction";
import {HomeSectionsHorizontal} from "./HomeSectionsHorizontal";
import {HomeSectionsVertical} from "./HomeSectionsVertical";

const PageTemplate = ({ pagina }) => {
    const { pageInfo, fetchPageInfo, error } = usePageInfo(); // Extraer pageInfo y error del contexto

    useEffect(() => {
        fetchPageInfo(pagina); // Llamada para cargar la información específica de la página
    }, [fetchPageInfo, pagina]);

    return (
        <>
            {pageInfo && <Introduction {...pageInfo} />}
            
            {error ? (
                <p>{error}</p>
            ) : (
                pageInfo?.articles && pageInfo.articles.length > 0 ? (
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
            <div className="p-10"></div>
        </>
    );
};

export default PageTemplate;