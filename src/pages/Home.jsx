import { useState, useEffect } from "react";
import { HomeSections } from "@/components/HomeSections"; 

const Home = () => {
    const [info, setInfo] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch("/mock.json");
            const data = await response.json();
            setInfo(data.MockHome);
            console.log(data.MockHome);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <h2 className="Section-h2">Bienvenido a Ca Marmota</h2>
            {
                info.map((item, index) => (
                    <section className="Section" key={index}>
                        <HomeSections {...item} />
                    </section>
                ))
            }
        </>
    );
}

export default Home;