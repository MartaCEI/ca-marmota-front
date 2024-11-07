export const HomeSectionsHorizontal = ({ section }) => {
    const { VITE_BACKEND_URL } = import.meta.env;
    const { sectionTitle, sectionSubtitle, image } = section;
    
    return (
        <>
            <div className="Horizontal-div">
                <div>
                <img className="Horizontal-img" src={`${VITE_BACKEND_URL}/img/${image}`} alt={image} />
                </div>
                <div>
                <h3 className="Horizontal-h3">{sectionTitle}</h3>
                <p className="Horizontal-p">{sectionSubtitle}</p>
                </div>
            </div>
        </>
    );
};