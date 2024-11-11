export const HomeSectionsHorizontal = ({article}) => {
    const { VITE_BACKEND_URL } = import.meta.env;
    const { articleTitle, articleSubtitle, articleImage } = article;
    
    return (
        <>
            <div className="Horizontal-div">
                <img className="Horizontal-img" src={`${VITE_BACKEND_URL}/img/${articleImage}`} alt={articleImage} />
                <div className="Horizontal-div-container">
                    <div className="Horizontal-div-grid">
                        <div className="Horizontal-div-inner"></div>
                        <div className="Horizontal-div-inner">
                            <h2 className="Horizontal-h2">{articleTitle}</h2>
                            <div className="Horizontal-line"></div>
                            <p className="Horizontal-p">{articleSubtitle}</p>
                            <button className="Horizontal-btn">Ver mas</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};