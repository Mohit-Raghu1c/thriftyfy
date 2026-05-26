import { useState } from "react";

import {
    Link,
    useNavigate
} from "react-router-dom";


export default function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
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


    // HANDLE LOGIN
    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        setMessage("");

        try {

            const res = await fetch(
                "https://thriftify-pa6z.onrender.com/api/login",
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


            // LOGIN FAILED
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


            setMessage("Login successful");


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

        <div className="container my-5 min-vh-100">

            <div className="form-container">

                <h3 className="mb-3">
                    Login
                </h3>


                <form onSubmit={handleSubmit}>


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
                        className="btn btn-primary w-100"
                        disabled={loading}
                    >

                        {
                            loading
                                ? "Logging in..."
                                : "Login"
                        }

                    </button>


                    {/* REGISTER LINK */}
                    <p className="mt-3 text-center">

                        Don't have an account?

                        <Link
                            to="/signup"
                            className="ms-1"
                        >
                            Register
                        </Link>

                    </p>

                </form>

            </div>

        </div>
    );
}