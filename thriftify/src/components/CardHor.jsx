import React from "react";

import { Link } from "react-router-dom";


export default function CardHor({ props, showDelete = false, onDelete }) {

    return (

        <div className="row item-row p-3 mb-3 align-items-center shadow-sm rounded bg-white">


            {/* IMAGE */}
            <div className="col-md-3 mb-3 mb-md-0">

                <img
                    src={
                        props.images?.[0]?.url ||
                        "/img/placeholder.jpg"
                    }
                    className="w-100 rounded"
                    alt={props.title}
                    style={{
                        height: "220px",
                        objectFit: "cover"
                    }}
                />

            </div>


            {/* ITEM INFO */}
            <div className="col-md-6">

                {/* TITLE */}
                <h5>

                    <Link
                        to={`/item/${props._id}`}
                        className="text-decoration-none text-dark"
                    >

                        {props.title}

                    </Link>

                </h5>


                {/* PRICE */}
                <h5 className="text-success mb-2">

                    ₹{props.price}

                </h5>


                {/* CONDITION */}
                <p className="mb-2 text-warning">

                    {"⭐".repeat(props.condition || 0)}

                </p>


                {/* DESCRIPTION */}
                <p className="text-muted small">

                    {props.description}

                </p>


                {/* DETAILS */}
                <p className="text-muted mb-1">

                    <strong>Brand:</strong> {props.brand}

                    {" | "}

                    <strong>Size:</strong> {props.size}

                    {" | "}

                    <strong>Color:</strong> {props.color}

                </p>


                {/* CATEGORY + TYPE */}
                <div className="d-flex gap-2 mt-2">

                    <span className="badge bg-secondary">

                        {props.category}

                    </span>


                    <span
                        className={
                            props.type === "donate"
                                ? "badge bg-danger"
                                : "badge bg-success"
                        }
                    >

                        {
                            props.type === "donate"
                                ? "Donate"
                                : "Sell"
                        }

                    </span>

                </div>

            </div>


            {/* ACTION BUTTON */}
            <div className="col-md-3 text-md-end mt-3 mt-md-0">

                <Link
                    to={`/item/${props._id}`}
                    className="btn btn-primary me-1"
                >

                    View Item

                </Link>

                {
                    showDelete && (

                        <Link
                            className="btn btn-danger"
                            onClick={() =>
                                onDelete(props._id)
                            }
                        >
                            Delete
                        </Link>
                    )
                }


            </div>

        </div>
    );
}