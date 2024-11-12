const Introduction = ({image, logo, title, subtitle}) => {
    const { VITE_BACKEND_URL } = import.meta.env;

    return (
        <>
            <div className="Home-header">
                <img
                    className="Home-header-img"
                    src={`${VITE_BACKEND_URL}/img/${image}`}
                    alt={image || "Header"}
                />
                <img
                    className="Home-header-logo"
                    src={`${VITE_BACKEND_URL}/img/${logo}`}
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