export const HomeSectionsVertical = ({section}) => {
    const { VITE_BACKEND_URL } = import.meta.env;
    const { sectionTitle, sectionSubtitle, image } = section;
    
    return (
        <>
            <div className="Vertical-div">
                <div className="Vertical-div-container-outter">
                    <div className="Vertical-div-container-img">
                        <img className="Vertical-img" src={`${VITE_BACKEND_URL}/img/${image}`} alt={image} />
                        <div className="Vertical-img-cover"></div>
                    </div>
                        <div className="Vertical-div-grid">
                            <div className="Vertical-div-inner text">
                                <h2 className="Vertical-h2">{sectionTitle}</h2>
                                <div className="Vertical-HorizontalLine"></div>
                                <p className="Vertical-p">{sectionSubtitle}</p>
                                <button className="Vertical-btn">Ver más</button>
                            </div>
                            <div className="Vertical-div-inner"></div>
                        </div>
                </div>
            </div>
        </>
    );
};