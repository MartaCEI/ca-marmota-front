export const HomeSectionsHorizontal = ({ section }) => {
    const { VITE_BACKEND_URL } = import.meta.env;
    const { sectionTitle, sectionSubtitle, image } = section;
    
    return (
        <>
            <div className="Horizontal-div">
                <img className="Horizontal-img" src={`${VITE_BACKEND_URL}/img/${image}`} alt={image} />
                <div className="Horizontal-div-container">
                    <div className="Horizontal-div-grid">
                        <div className="Horizontal-div-inner"></div>
                        <div className="Horizontal-div-inner">
                            <h2 className="Horizontal-h2">{sectionTitle}</h2>
                            <div className="Horizontal-line"></div>
                            <p className="Horizontal-p">{sectionSubtitle}</p>
                            <button className="Horizontal-btn">Ver mas</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};