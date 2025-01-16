import { Link } from "react-router-dom";

export const HomeSectionsHorizontal = ({article}) => {
    const { VITE_FRONTEND_IMG } = import.meta.env;
    const { articleTitle, articleSubtitle, articleImage } = article;
    
    return (
        <>
            <div className="Horizontal-div">
                <img className="Horizontal-img" src={`${VITE_FRONTEND_IMG}/${articleImage}`} alt={articleImage} />
                <div className="Horizontal-div-container">
                    <div className="Horizontal-div-grid">
                        <div className="Horizontal-div-inner"></div>
                        <div className="Horizontal-div-inner">
                            <h2 className="Horizontal-h2">{articleTitle}</h2>
                            <div className="Horizontal-line"></div>
                            <p className="Horizontal-p">{articleSubtitle}</p>
                            {/* Muestra el link a las habitaciones solo caundo el titulo del article es habiatines */}
                            {articleTitle === "Habitaciones" && (
                                <Link to="/rooms" className="Horizontal-btn">Ver más</Link>
                            )}
                            {/* Muestra el link a los servicios solo caundo el titulo del article es Piscina y Spa */}
                            {articleTitle === "Piscina y Spa" && (
                                <Link to="/servicios" className="Horizontal-btn">Ver más</Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};