import { useRouteError } from "react-router-dom";

const ErrorPage = () => {

    const error = useRouteError();
    console.log(error);

    return (
        <div>
            Ooops... Hay un error
            <p>
                { error?.estatusText || error?.message || "Página no encontrada."} 
            </p>
        </div>
    );
}

export default ErrorPage;