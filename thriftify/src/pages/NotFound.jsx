import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="d-flex vh-100 align-items-center justify-content-center bg-dark text-white">
      <div className="text-center">
        <h1 className="display-1 fw-bold">404</h1>
        <h3 className="mb-3">Oops... You really messed up.</h3>
        <p className="text-muted">
          This page doesn’t exist. Either you typed something wrong,
          or this site just rejected your bad decisions.
        </p>

        <Link to="/" className="btn btn-danger mt-3">
          Go Back Before It Gets Worse
        </Link>
      </div>
    </div>
  );
}