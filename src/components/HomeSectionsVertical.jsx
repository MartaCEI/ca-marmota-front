export const HomeSectionsVertical = ({section}) => {
    const { VITE_BACKEND_URL } = import.meta.env;
    const { sectionTitle, sectionSubtitle, image } = section;
    
    return (
        <>
            <div className="Vertical-div">
                <h3 className="Vertical-h3">{sectionTitle}</h3>
                <p className="Vertical-p">{sectionSubtitle}</p>
            </div>
            <div className="Vertical-divImg">
                <img className="Vertical-img" src={`${VITE_BACKEND_URL}/img/${image}`} alt={image} />
            </div>
        </>
    );
};