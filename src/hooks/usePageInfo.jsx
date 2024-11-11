import { createContext, useContext, useState, useEffect } from "react";

// Crear un contexto para obtener el contenido de las páginas principales.
const PageInfoContext = createContext();

export function PageInfoProvider({ children, pageName }) {
    const { VITE_API_URL } = import.meta.env;
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
            const response = await fetch(`${VITE_API_URL}/page`);
            const objeto = await response.json();
            console.log("Datos recibidos:", objeto);

            if (objeto.status === "error") {
                setError(`Tuvimos un error: ${objeto.msg}`);
                return;
            }

            const pageData = objeto.data.find(item => item.page === pageName);
            setPageInfo(pageData || {}); // Establece un objeto vacío si no encuentra coincidencia

        } catch (error) {
            if (error.name !== 'AbortError') {
                console.log("Error al hacer el fetch de los datos:", error);
                setError("Error al cargar los datos");
            }
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
