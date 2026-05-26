import { useState, useEffect } from "react";
import CardVer from "../components/CardVer";
import { Link } from "react-router-dom";

function Home() {

    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch("https://thriftify-pa6z.onrender.com/api/home")
            .then((res) => res.json())
            .then((data) => setItems(data))
            .catch((err) => console.error(err));
    }, []);


    return <>

        {/* <!-- Hero Section --> */}
        <div className="container my-5">
            <div id="carouselExample" className="carousel slide hero-carousel" data-bs-ride="carousel">

                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="/img/hero (4).png" className="d-block w-100 h-80" alt="Slide 1" />
                        <div className="carousel-caption">
                            <h2 className="text-dark">Buy. Sell. Donate.</h2>
                            <p className="text-dark">Give clothes a second life</p>
                            <Link to="/sell" className="btn btn-primary">Start Selling</Link>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src="/img/hero (2).png" className="d-block w-100 h-80" alt="Slide 2" />
                    </div>
                    <div className="carousel-item">
                        <img src="/img/hero (3).png" className="d-block w-100 h-80" alt="Slide 3" />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon"></span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                    <span className="carousel-control-next-icon"></span>
                </button>
            </div>
        </div>

        <div className="container mt-5 mb-3">
            <h3 className="fw-bold">Latest Listings</h3>
            <p className="text-muted">Browse recently added items</p>
        </div>

        <div className="container mb-4">
            <button className="btn btn-outline-dark btn-sm me-2">All</button>
            <button className="btn btn-outline-dark btn-sm me-2">Shirts</button>
            <button className="btn btn-outline-dark btn-sm me-2">Jackets</button>
            <button className="btn btn-outline-dark btn-sm">Hoodies</button>
        </div>

        {/* <!-- Cards Section --> */}
        <div className="container">

            <div className="row g-4">

                {items.map((item) => (

                 <CardVer key={item.id} props={item} />

                ))}

            </div>

        </div>


        <div className="container my-5 text-center profile-card">
            <h3>Why Thriftify?</h3>
            <div className="row mt-4">
                <div className="col-md-4">
                    <h5>💸 Save Money</h5>
                    <p>Buy quality clothes at lower prices</p>
                </div>
                <div className="col-md-4">
                    <h5>♻️ Eco Friendly</h5>
                    <p>Reduce fashion waste</p>
                </div>
                <div className="col-md-4">
                    <h5>🤝 Community Driven</h5>
                    <p>Support local sellers</p>
                </div>
            </div>
        </div>


    </>
}


export default Home;