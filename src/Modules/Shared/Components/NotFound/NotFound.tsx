
import NotFoundImg from "../../../../assets/images/NotFound.png";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 text-center px-3">
      <img src={NotFoundImg} alt="Not Found" className="img-fluid mb-4  w-50" />

      <h2 className="fw-bold  mb-2">Page Not Found</h2>

      <p className="text-muted mb-4">
        The page you are looking for might have been removed,
        <br />
        had its name changed, or is temporarily unavailable.
      </p>

      <Link
        to="/"
        className="rounded-pill px-5 py-3 bg-main-color border-0 fw-bold"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
