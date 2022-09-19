import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Navbar.css";
import { formProcess } from "../../util/FormValidation";
import { ProductContext } from "../../util/ProductContext";

const Navbar = () => {
  const { sku, name, price, productType, productDetail } =
    useContext(ProductContext);

  const { array } = useContext(ProductContext);

  const liveUrl = process.env.REACT_APP_LIVE_URL;

  let navbarHeader = "Product List";
  let enableChangeRoute = true;
  let currentUrl = window.location.href;
  var path = currentUrl.split("/").pop();

  if (path === "add-product") {
    enableChangeRoute = false;
    navbarHeader = "Product Add";
  }

  let navigate = useNavigate();
  const changeRoute = () => {
    navigate("/add-product");
  };

  const returnToHome = () => {
    navigate("/");
  };

  const massDelete = async () => {
    if (array.length === 0) {
      return alert("Please select a product to delete.");
    }
    await axios.delete(liveUrl, {
      data: array,
    });
    window.location.reload();
  };

  const save = async (e) => {
    e.preventDefault();
    if (formProcess(sku, name, price, productType, productDetail)) {
      await axios
        .post(liveUrl, {
          SKU: sku,
          name: name,
          price: price,
          productType: productType,
          productDetail: productDetail,
        })
        .then((response) => {
          if (response.data !== "") {
            alert(response.data);
          }
        });
      navigate("/");
    } else {
      alert("Please, submit required data");
    }
  };
  return (
    <div className="navbar-container">
      <div className="navbar-header">
        <h2>{navbarHeader}</h2>
        <div className="navbar-buttons">
          <button
            className="add-button"
            onClick={enableChangeRoute ? changeRoute : save}
          >
            {enableChangeRoute ? <p>ADD</p> : <p>Save</p>}{" "}
          </button>
          <button
            id="delete-product-btn"
            onClick={enableChangeRoute ? massDelete : returnToHome}
          >
            {enableChangeRoute ? <p>MASS DELETE</p> : <p>Cancel</p>}
          </button>
        </div>
      </div>
      <hr></hr>
    </div>
  );
};
export default Navbar;
