import React, { useState, useEffect } from "react";

import {
  useNavigate,
  Link
} from "react-router-dom";


export default function Navbar() {

  const [query, setQuery] = useState("");

  const [user, setUser] = useState(null);

  const navigate = useNavigate();


  // CHECK LOGIN STATE
  useEffect(() => {

    const storedUser = localStorage.getItem("user");

    if (storedUser) {

      setUser(JSON.parse(storedUser));
    }

  }, []);


  // SEARCH
  const handleSubmit = (e) => {

    e.preventDefault();

    if (!query.trim()) return;

    navigate(
      `/search?q=${encodeURIComponent(query)}`
    );
  };


  // LOGOUT
  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    setUser(null);

    navigate("/login");
  };


  return (

    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

      <div className="container">


        {/* LOGO */}
        <Link
          className="navbar-brand fw-bold"
          to="/"
        >

          Thriftify

        </Link>


        {/* MOBILE BUTTON */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >

          <span className="navbar-toggler-icon"></span>

        </button>


        {/* NAVBAR CONTENT */}
        <div
          className="collapse navbar-collapse"
          id="navbarNav"
        >

          {/* LEFT NAV */}
          <ul className="navbar-nav me-auto">


            <li className="nav-item">

              <Link
                className="nav-link"
                to="/about"
              >

                About

              </Link>

            </li>





            {/* LOGGED IN */}
            {
              user ? (
                <>
                  <li className="nav-item">

                    <Link
                      className="nav-link"
                      to="/sell"
                    >

                      Sell

                    </Link>

                  </li>


                  {/* PROFILE */}
                  <li className="nav-item">

                    <Link
                      className="nav-link"
                      to={`/profile/${user.id}`}
                    >

                      Profile

                    </Link>

                  </li>


                  {/* LOGOUT */}
                  <li className="nav-item">

                    <button
                      className="nav-link"
                      onClick={handleLogout}
                    >

                      Logout

                    </button>

                  </li>

                </>
              )

                :

                (
                  <>

                    {/* LOGIN */}
                    <li className="nav-item">

                      <Link
                        className="nav-link"
                        to="/login"
                      >

                        Login

                      </Link>

                    </li>


                    {/* SIGNUP */}
                    <li className="nav-item">

                      <Link
                        className="nav-link"
                        to="/signup"
                      >

                        Signup

                      </Link>

                    </li>

                  </>
                )
            }

          </ul>


          {/* SEARCH */}
          <form
            className="d-flex"
            onSubmit={handleSubmit}
          >

            <input
              className="form-control me-2"
              type="search"
              placeholder="Search clothes..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />

            <button
              className="btn btn-outline-light"
              type="submit"
            >

              Search

            </button>

          </form>

        </div>

      </div>

    </nav>
  );
}