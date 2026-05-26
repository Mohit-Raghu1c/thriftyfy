import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        city: "",
        address: "",
        pincode: ""
    });

    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState("");


    // HANDLE INPUT CHANGE
    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };


    // HANDLE SUBMIT
    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        setMessage("");

        try {

            const res = await fetch(
                "https://thriftify-pa6z.onrender.com/api/register",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(formData)
                }
            );


            const data = await res.json();

            console.log(data);


            // BACKEND ERROR
            if (!res.ok) {

                setMessage(data.message);

                setLoading(false);

                return;
            }


            // SAVE TOKEN
            localStorage.setItem(
                "token",
                data.token
            );


            // SAVE USER
            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );


            setMessage("Registration successful");


            // REDIRECT
            navigate("/");


        } catch (err) {

            console.error(err);

            setMessage("Something went wrong");

        } finally {

            setLoading(false);
        }
    };


    return (

        <div className="container my-5">

            <div className="form-container">

                <h3 className="mb-4">
                    Register
                </h3>


                <form onSubmit={handleSubmit}>


                    {/* NAME */}
                    <div className="mb-3">

                        <label className="form-label">
                            Full Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            placeholder="Enter full name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    {/* EMAIL */}
                    <div className="mb-3">

                        <label className="form-label">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="Enter email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    {/* PASSWORD */}
                    <div className="mb-3">

                        <label className="form-label">
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder="Enter password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    {/* PHONE */}
                    <div className="mb-3">

                        <label className="form-label">
                            Phone Number
                        </label>

                        <input
                            type="text"
                            name="phone"
                            className="form-control"
                            placeholder="Enter phone number"
                            value={formData.phone}
                            onChange={handleChange}
                        />

                    </div>


                    {/* CITY */}
                    <div className="mb-3">

                        <label className="form-label">
                            City
                        </label>

                        <input
                            type="text"
                            name="city"
                            className="form-control"
                            placeholder="Enter city"
                            value={formData.city}
                            onChange={handleChange}
                        />

                    </div>


                    {/* ADDRESS */}
                    <div className="mb-3">

                        <label className="form-label">
                            Address
                        </label>

                        <textarea
                            name="address"
                            className="form-control"
                            rows="3"
                            placeholder="Enter address"
                            value={formData.address}
                            onChange={handleChange}
                        ></textarea>

                    </div>


                    {/* PINCODE */}
                    <div className="mb-3">

                        <label className="form-label">
                            Pincode
                        </label>

                        <input
                            type="text"
                            name="pincode"
                            className="form-control"
                            placeholder="Enter pincode"
                            value={formData.pincode}
                            onChange={handleChange}
                        />

                    </div>


                    {/* MESSAGE */}
                    {
                        message && (

                            <div className="alert alert-info">
                                {message}
                            </div>
                        )
                    }


                    {/* BUTTON */}
                    <button
                        type="submit"
                        className="btn btn-success w-100"
                        disabled={loading}
                    >

                        {
                            loading
                                ? "Registering..."
                                : "Register"
                        }

                    </button>


                    {/* LOGIN LINK */}
                    <p className="mt-3 text-center">

                        Already have an account?

                        <Link
                            to="/login"
                            className="ms-1"
                        >
                            Login
                        </Link>

                    </p>

                </form>

            </div>

        </div>
    );
}