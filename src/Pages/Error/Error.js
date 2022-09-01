import React from "react";
import "./Error.css";
import { useNavigate } from "react-router-dom";
const Error = () => {
  let navigate = useNavigate();
  const returnHome = () => {
    navigate("/");
  };
  return (
    <div className="error-container">
      <div className="container-details">
        <h1 className="error-header">404</h1>
        <div className="error-gif"></div>
        <p className="lost">Looks like you're lost</p>
        <p className="not-available">
          The page you are looking for isn't available
        </p>
        <button className="go-home" onClick={returnHome}>
          <p>Go Home</p>
        </button>
      </div>
    </div>
  );
};
export default Error;
