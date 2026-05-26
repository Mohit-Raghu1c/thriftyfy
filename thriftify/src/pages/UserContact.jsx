import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";


export default function UserContact() {

    const { id } = useParams();


    // USER DATA
    const [user, setUser] = useState(null);


    // LOADING
    const [loading, setLoading] = useState(true);


    // ERROR
    const [error, setError] = useState("");


    useEffect(() => {

        const fetchUser = async () => {

            try {

                setLoading(true);

                const res = await fetch(
                    `https://thriftify-pa6z.onrender.com/api/profile/${id}`
                );


                if (!res.ok) {

                    throw new Error("Failed to fetch user");
                }

                const data = await res.json();

                setUser(data);

            } catch (err) {

                console.error(err);

                setError(err.message);

            } finally {

                setLoading(false);
            }
        };

        fetchUser();

    }, [id]);


    // LOADING UI
    if (loading) {

        return (

            <div className="container my-5 text-center">

                <div className="spinner-border"></div>

            </div>
        );
    }


    // ERROR UI
    if (error) {

        return (

            <div className="container my-5">

                <div className="alert alert-danger">

                    {error}

                </div>

            </div>
        );
    }


    // USER NOT FOUND
    if (!user) {

        return (

            <div className="container my-5">

                <div className="alert alert-secondary">

                    User not found

                </div>

            </div>
        );
    }


    return (

        <div className="container my-5">

            <div className="profile-card shadow p-4 rounded bg-white">

                <h3 className="mb-4">

                    Seller Contact Information

                </h3>


                <div className="row g-3">


                    {/* NAME */}
                    <div className="col-md-6">

                        <div className="fw-bold">
                            Full Name
                        </div>

                        <div>
                            {user.name}
                        </div>

                    </div>


                    {/* EMAIL */}
                    <div className="col-md-6">

                        <div className="fw-bold">
                            Email
                        </div>

                        <div>
                            {user.email}
                        </div>

                    </div>


                    {/* PHONE */}
                    <div className="col-md-6">

                        <div className="fw-bold">
                            Phone Number
                        </div>

                        <div>
                            {user.phone}
                        </div>

                    </div>


                    {/* CITY */}
                    <div className="col-md-6">

                        <div className="fw-bold">
                            City
                        </div>

                        <div>
                            {user.city}
                        </div>

                    </div>


                    {/* ADDRESS */}
                    <div className="col-md-6">

                        <div className="fw-bold">
                            Address
                        </div>

                        <div>
                            {user.address}
                        </div>

                    </div>


                    {/* PINCODE */}
                    <div className="col-md-6">

                        <div className="fw-bold">
                            Pincode
                        </div>

                        <div>
                            {user.pincode}
                        </div>

                    </div>

                </div>


                {/* ACTION BUTTONS */}
                <div className="mt-4 d-flex flex-wrap gap-2">


                    {/* CALL */}
                    <a
                        href={`tel:${user.phone}`}
                        className="btn btn-primary"
                    >

                        Call Seller

                    </a>


                    {/* WHATSAPP */}
                    <a
                        href={`https://wa.me/91${user.phone}`}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-success"
                    >

                        WhatsApp

                    </a>


                    {/* EMAIL */}
                    <a
                        href={`mailto:${user.email}`}
                        className="btn btn-outline-primary"
                    >

                        Email Seller

                    </a>

                </div>

            </div>

        </div>
    );
}