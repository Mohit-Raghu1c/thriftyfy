import React from "react";

import { Link } from "react-router-dom";


export default function CardVer({ props }) {

    return (

        <div className="col-sm-6 col-md-4 col-lg-3">

            <div className="card card-ver h-100 shadow-sm">


                {/* IMAGE */}
                <img
                    src={
                        props.images?.[0]?.url ||
                        "/img/placeholder.jpg"
                    }
                    className="card-img-top"
                    alt={props.title}
                    style={{
                        height: "300px",
                        objectFit: "cover"
                    }}
                />


                <div className="card-body d-flex flex-column">


                    {/* TITLE */}
                    <h5 className="card-title">

                        <Link
                            to={`/item/${props._id}`}
                            className="text-decoration-none text-dark"
                        >
                            {props.title}
                        </Link>

                    </h5>


                    {/* PRICE */}
                    <p className="card-text mb-1">

                        <strong>
                            ₹{props.price}
                        </strong>

                    </p>


                    {/* CONDITION */}
                    <p className="card-text text-warning">

                        {"⭐".repeat(props.condition || 0)}

                    </p>


                  



                </div>

            </div>

        </div>
    );
}