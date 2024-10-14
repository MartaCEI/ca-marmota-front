export const HomeSections = ({title, subtitle, image}) => {
    return (
        <>
            <div className="Section-div">
                <h3 className="Section-h3">{title}</h3>
                <p className="Section-p">{subtitle}</p>
            </div>
            <img className="Section-img" src={image} alt={title} />
        </>
    );
}