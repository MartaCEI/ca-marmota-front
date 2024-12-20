import { createContext, useContext, useState, useEffect } from "react";

// Crear un contexto para obtener el contenido de las páginas principales.
const PageInfoContext = createContext();

export function PageInfoProvider({ children, pageName }) {
    const { VITE_FRONTEND_URL } = import.meta.env;
    const [pageInfo, setPageInfo] = useState({
        page: "",
        image: "",
        logo: "",
        title: "",
        subtitle: "",
        articles: []
    });
    const [error, setError] = useState(null); // Estado para manejar errores

    useEffect(() => {
        if (pageName) {
            fetchPageInfo(pageName);
        }
    }, [pageName]);

    // Función para obtener la información de la página
    const fetchPageInfo = async (pageName) => {
        try {
            const respuesta = await fetch(VITE_FRONTEND_URL);
            if (!respuesta.ok) {
                throw new Error(`Error ${respuesta.status}: No se pudo cargar la información`);
            }
            const data = await respuesta.json();
            const pageData = data.pagesInfo.find((page) => page.page === pageName);
            if (pageData) {
                setPageInfo(pageData);
            } else {
                throw new Error("Página no encontrada");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <PageInfoContext.Provider value={{ pageInfo, fetchPageInfo, error }}>
            {children}
        </PageInfoContext.Provider>
    );
}

export function usePageInfo() {
    return useContext(PageInfoContext);
}
