import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!sessionStorage.getItem("userId")) {
      navigate("/");
    }
  }, [navigate]);

  const [result, setResult] = useState([]);

  const [number, setNumber] = useState(1);

  const getNumbers = async () => {
    try {
      if (number === 0) {
        alert("The only fancy number with 0 is 0000");
        return;
      }
      if (number > 9) {
        alert("Please enter a number between 1 and 9");
        return;
      }
      const res = await axios.get(
        `http://${window.location.hostname}:5000/generate?number=${number}`
      );
      setResult(res.data.result);
    } catch (error) {
      console.log(error);
      if (error.response.data) {
        alert(error.response.data.error || error.response.data.msg);
      }
    }
  };

  return (
    <>
      <div className="row mt-5">
        <div className="col-md-6">
          <input
            type="number"
            className="form-control"
            placeholder="Enter your fancy number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <button className="btn btn-primary w-100" onClick={getNumbers}>
            Generate
          </button>
        </div>
        <div className="col-md-2">
          <button
            className="btn btn-primary w-100"
            onClick={() => {
              sessionStorage.removeItem("userId");
              navigate("/");
            }}
          >
            Logout
          </button>
        </div>
      </div>
      <div className="row mt-5 gap-2">
        {result.map((d, index) => {
          return (
            <div className="col-sm-1 col-md-1 col-lg-1" key={index}>
              <div className="card text-center border-primary">
                <div className="lead">{d}</div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;
