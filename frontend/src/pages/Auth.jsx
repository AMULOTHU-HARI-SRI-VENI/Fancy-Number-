import { useState, useEffect } from "react";
import axios from "axios";

import { useNavigate } from "react-router";

const Auth = () => {
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
  });

  useEffect(() => {
    if (sessionStorage.getItem("userId")) {
      navigate("/home");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      let reqString = `http://${window.location.hostname}:5000/`;
      if (isRegister) {
        reqString += "register";
      } else {
        reqString += "login";
      }
      const response = await axios.post(reqString, data);

      if (isRegister) {
        alert("User registered succesfully");
        setData({
          name: "",
          email: "",
          password: "",
        });
      } else {
        sessionStorage.setItem("userId", response.data._id);
        navigate("/home");
      }
    } catch (error) {
      if (error.response.data) {
        alert(error.response.data.error || error.response.data.msg);
      }
    }
  };

  return (
    <>
      <div className="col-sm-12 col-md-8 col-lg-8">
        <img
          src="https://img.freepik.com/free-vector/colorful-number-collection-with-flat-design_23-2147816539.jpg?w=2000"
          alt="Fancy"
          className="card-img-top"
        />
      </div>
      <div className="col-sm-12 col-md-4 col-lg-4 mt-5">
        <div className="card mt-5">
          <div className="display-6 text-center">
            {isRegister ? "Register" : "Login"}
          </div>
          <div className="card-body">
            {isRegister && (
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={data.name}
                  onChange={(e) => handleChange(e)}
                  placeholder="Enter Name"
                />
              </div>
            )}
            <div className="form-group mt-2">
              <input
                type="email"
                name="email"
                className="form-control"
                value={data.email}
                onChange={(e) => handleChange(e)}
                placeholder="Enter Email"
              />
            </div>
            <div className="form-group mt-2">
              <input
                type="password"
                name="password"
                className="form-control"
                value={data.password}
                onChange={(e) => handleChange(e)}
                placeholder="Enter Password"
              />
            </div>
            <div className="form-group mt-5">
              <div className="row">
                <div className="col-md-6 text-end">
                  <button className="btn btn-primary" onClick={handleSubmit}>
                    {isRegister ? "Register" : "Login"}
                  </button>
                </div>
                <div className="col-md-6 text-end">
                  <button
                    className="btn btn-link"
                    onClick={() => setIsRegister(!isRegister)}
                  >
                    {isRegister ? "Login" : "Register"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
