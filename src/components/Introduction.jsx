const Introduction = ({image, logo, title, subtitle}) => {
    const { VITE_FRONTEND_IMG } = import.meta.env;

    return (
        <>
            <div className="Home-header">
                <img
                    className="Home-header-img"
                    src={`${VITE_FRONTEND_IMG}/${image}`}
                    alt={image || "Header"}
                />
                <img
                    className="Home-header-logo"
                    src={`${VITE_FRONTEND_IMG}/${logo}`}
                    alt="Logo"
                />
            </div>
            <section className="Section-home">
                <h1 className="Section-home-h1">{title}</h1>
                <p className="Section-home-p">{subtitle}</p>
            </section>
            <div className="Vertical-line"></div>
        </>
    );
}

export default Introduction;