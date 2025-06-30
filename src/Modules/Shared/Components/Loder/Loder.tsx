import { Audio } from "react-loader-spinner";

const Loder = () => {
  return (
    <div className="d-flex justify-content-center align-items-center py-5">
      <Audio
        height="80"
        width="80"
        color="rgba(239, 155, 40, 1)"
        ariaLabel="audio-loading"
        wrapperStyle={{}}
        wrapperClass="wrapper-class"
        visible={true}
      />
    </div>
  );
};

export default Loder;
