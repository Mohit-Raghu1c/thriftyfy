import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import CardHor from "../components/CardHor";


export default function Profile() {

    const { id } = useParams();
    const [error, setError] = useState("");



    // LOGGED USER
    const loggedUser = JSON.parse(
        localStorage.getItem("user")
    );

    const isOwner = loggedUser?.id === id;


    // PROFILE DATA
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        city: "",
        address: "",
        pincode: ""
    });


    // USER ITEMS
    const [items, setItems] = useState([]);


    // FETCH PROFILE
    useEffect(() => {

        const fetchProfile = async () => {

            try {

                const res = await fetch(
                    `https://thriftify-pa6z.onrender.com/api/profile/${id}`
                );


                if (!res.ok) {

                    throw new Error("Profile does not exist!");
                }

                const data = await res.json();


                setFormData({
                    name: data.name || "",
                    email: data.email || "",
                    phone: data.phone || "",
                    city: data.city || "",
                    address: data.address || "",
                    pincode: data.pincode || ""
                });

            } catch (err) {

                console.error(err);
                setError(err.message);
            }
        };

        fetchProfile();

    }, [id]);


    // FETCH USER ITEMS
    useEffect(() => {

        fetch(
            `https://thriftify-pa6z.onrender.com/api/items/${id}`
        )
            .then((res) => res.json())
            .then((data) => setItems(data))
            .catch((err) => console.error(err));

    }, [id]);


    // HANDLE INPUT CHANGE
    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };


    // UPDATE PROFILE
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const token = localStorage.getItem("token");


            const res = await fetch(
                `https://thriftify-pa6z.onrender.com/api/profile/${id}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },

                    body: JSON.stringify(formData)
                }
            );


            const data = await res.json();

            console.log("Updated:", data);

            alert("Profile updated successfully!");

        } catch (err) {

            console.error(err);

            alert("Update failed");
        }
    };

    const handleDelete = async (itemId) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this item?"
        );

        if (!confirmDelete) return;


        try {

            const token = localStorage.getItem("token");


            const res = await fetch(
                `https://thriftify-pa6z.onrender.com/api/item/${itemId}`,
                {
                    method: "DELETE",

                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );


            const data = await res.json();

            console.log(data);


            // REMOVE ITEM FROM UI
            setItems((prev) =>
                prev.filter((item) => item._id !== itemId)
            );


            alert("Item deleted successfully!");

        } catch (err) {

            console.error(err);

            alert("Delete failed");
        }
    };


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


    return (
        <>
            {/* PROFILE */}
            <div className="container my-5">

                <div className="profile-card">

                    <h3 className="mb-4">
                        User Profile
                    </h3>


                    {
                        isOwner ? (

                            // EDITABLE FORM
                            <form onSubmit={handleSubmit}>

                                <div className="row g-3">

                                    <div className="col-md-6">
                                        <label>
                                            Full Name
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            value={formData.name}
                                            onChange={handleChange}
                                            name="name"
                                        />
                                    </div>


                                    <div className="col-md-6">
                                        <label>
                                            Email
                                        </label>

                                        <input
                                            type="email"
                                            className="form-control"
                                            value={formData.email}
                                            onChange={handleChange}
                                            name="email"
                                        />
                                    </div>


                                    <div className="col-md-6">
                                        <label>
                                            Phone Number
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            name="phone"
                                        />
                                    </div>


                                    <div className="col-md-6">
                                        <label>
                                            City
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            value={formData.city}
                                            onChange={handleChange}
                                            name="city"
                                        />
                                    </div>


                                    <div className="col-md-6">
                                        <label>
                                            Address
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            value={formData.address}
                                            onChange={handleChange}
                                            name="address"
                                        />
                                    </div>


                                    <div className="col-md-6">
                                        <label>
                                            Pincode
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            value={formData.pincode}
                                            onChange={handleChange}
                                            name="pincode"
                                        />
                                    </div>


                                    <div className="col-12">

                                        <button
                                            className="btn btn-primary"
                                            type="submit"
                                        >
                                            Update Profile
                                        </button>

                                    </div>

                                </div>

                            </form>

                        ) : (

                            // READ ONLY PROFILE
                            <div className="row g-3">

                                <div className="col-md-6">
                                    <label>
                                        Full Name
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        value={formData.name}
                                        disabled
                                    />
                                </div>


                                <div className="col-md-6">
                                    <label>
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        className="form-control"
                                        value={formData.email}
                                        disabled
                                    />
                                </div>


                                <div className="col-md-6">
                                    <label>
                                        Phone Number
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        value={formData.phone}
                                        disabled
                                    />
                                </div>


                                <div className="col-md-6">
                                    <label>
                                        City
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        value={formData.city}
                                        disabled
                                    />
                                </div>


                                <div className="col-md-6">
                                    <label>
                                        Address
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        value={formData.address}
                                        disabled
                                    />
                                </div>


                                <div className="col-md-6">
                                    <label>
                                        Pincode
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        value={formData.pincode}
                                        disabled
                                    />
                                </div>

                            </div>
                        )
                    }

                </div>

            </div>



            {/* USER ITEMS */}
            <div className="container">

                <h3 className="mb-4">
                    User Items
                </h3>


                {
                    items.length > 0 ? (

                        items.map((item) => (

                            <div
                                key={item._id}
                                className="position-relative"
                            >

                                <CardHor
                                    key={item._id}
                                    props={item}
                                    showDelete={isOwner}
                                    onDelete={handleDelete}
                                />




                            </div>
                        ))

                    ) : (

                        <p>
                            No items found
                        </p>
                    )
                }

            </div>

        </>
    );
}