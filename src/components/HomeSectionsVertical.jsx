import { Link } from "react-router-dom";

export const HomeSectionsVertical = ({article}) => {
    const { VITE_FRONTEND_IMG } = import.meta.env;
    const { articleTitle, articleSubtitle, articleImage } = article;
    
    return (
        <>
            <div className="Vertical-div">
                <div className="Vertical-div-container-outter">
                    <div className="Vertical-div-container-img">
                        <img className="Vertical-img" src={`${VITE_FRONTEND_IMG}/${articleImage}`} alt={articleImage} />
                        <div className="Vertical-img-cover"></div>
                    </div>
                    <div className="Vertical-div-grid">
                        <div className="Vertical-div-inner text">
                            <h2 className="Vertical-h2">{articleTitle}</h2>
                            <div className="Vertical-HorizontalLine"></div>
                            <p className="Vertical-p">{articleSubtitle}</p>
                            {/* Muestra el link a las habitaciones solo caundo el titulo del article es Restaurante*/}
                        {articleTitle === "Restaurante" && (
                            <Link to="/restaurante" className="Vertical-btn">Ver más</Link>
                        )}
                        {/* Muestra el link a los servicios solo caundo el titulo del article es Naturaleza y Aventura */}
                        {articleTitle === "Naturaleza y Aventura" && (
                            <Link to="/servicios" className="Vertical-btn">Ver más</Link>
                        )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};