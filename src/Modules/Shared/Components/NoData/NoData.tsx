
import NoDataImg from "../../../../assets/images/NoData.png";

const NoData = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 text-center px-3">
      <img
        src={NoDataImg}
        alt="No Data"
        className="img-fluid mb-4 w-25"
      />

      <h2 className="fw-bold mb-2">No Data Available</h2>

      <p className="text-muted mb-4">
        There’s currently no data to show here.<br />
        Please check back later or try adding some entries.
      </p>
    </div>
  );
};

export default NoData;
