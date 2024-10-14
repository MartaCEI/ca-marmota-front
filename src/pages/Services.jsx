import { useState, useEffect } from "react";
import { HomeSections } from "@/components/HomeSections";

const Services = () => {
    const [info, setInfo] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch("/constants.json");
            const data = await response.json();
            setInfo(data.MockServices);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            {info.map((item, index) => (
                <section className="Section" key={index}>
                    <HomeSections {...item} />
                </section>
            ))}
        </>
    );
}

export default Services;