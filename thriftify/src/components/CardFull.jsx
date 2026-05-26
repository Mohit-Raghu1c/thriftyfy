import React from "react";

import { Link } from "react-router-dom";


export default function CardFull({ props }) {

  return (

    <div className="container my-5 min-vh-100">

      <div className="row">


        {/* IMAGE CAROUSEL */}
        <div className="col-lg-6 mb-4">

          <div
            id="itemCarousel"
            className="carousel slide"
            data-bs-ride="carousel"
          >

            <div className="carousel-inner">


              {
                props.images?.length > 0
                  ? (
                    props.images.map((img, index) => (

                      <div
                        key={index}
                        className={`carousel-item ${index === 0 ? "active" : ""}`}
                      >

                        <img
                          src={img.url}
                          className="d-block w-100 rounded"
                          alt={props.title}
                          style={{
                            height: "500px",
                            objectFit: "cover"
                          }}
                        />

                      </div>
                    ))
                  )
                  : (
                    <div className="carousel-item active">

                      <img
                        src="/img/placeholder.jpg"
                        className="d-block w-100 rounded"
                        alt="Placeholder"
                        style={{
                          height: "500px",
                          objectFit: "cover"
                        }}
                      />

                    </div>
                  )
              }

            </div>


            {/* PREV BUTTON */}
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#itemCarousel"
              data-bs-slide="prev"
            >

              <span className="carousel-control-prev-icon"></span>

            </button>


            {/* NEXT BUTTON */}
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#itemCarousel"
              data-bs-slide="next"
            >

              <span className="carousel-control-next-icon"></span>

            </button>

          </div>

        </div>


        {/* ITEM INFO */}
        <div className="col-lg-6 item-info">

          <h2>
            {props.title}
          </h2>


          <h4 className="text-success mb-3">

            ₹{props.price}

          </h4>


          <p className="text-warning">

            {"⭐".repeat(props.condition || 0)}

          </p>


          <hr />


          <p>

            {props.description}

          </p>


          <ul className="list-group mb-4">

            <li className="list-group-item">
              <strong>Brand:</strong> {props.brand}
            </li>

            <li className="list-group-item">
              <strong>Size:</strong> {props.size}
            </li>

            <li className="list-group-item">
              <strong>Color:</strong> {props.color}
            </li>

            <li className="list-group-item">
              <strong>Category:</strong> {props.category}
            </li>

            <li className="list-group-item">
              <strong>Type:</strong> {props.type}
            </li>


          </ul>


          {/* CONTACT SELLER */}
          <Link
            className="btn btn-dark"
            to={`/contact/${props.seller_id?._id || props.seller_id}`}
          >

            Contact Seller

          </Link>

        </div>

      </div>

    </div>
  );
}