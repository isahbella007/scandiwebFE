import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../../Pages/AddProduct/Add";
import axios from "axios";
import "./Navbar.css";
import { productDeleteContext } from "../../Pages/Home/Home";
import {
  displayErrorMessage,
  formProcess,
} from "../../util/FormValidation";

const Navbar = () => {
  const { sku, name, price, productType, productDetail } =
    useContext(ProductContext);

  const { array } = useContext(productDeleteContext);

  // const url = "http://localhost:8080/products";
  const liveUrl = "https://scandiwebserver.godwinosakwe.com/products";

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
    await axios
      .delete(liveUrl, {
        data: array,
      })
      .catch((error) => {
        console.log(error);
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
        })
        .catch((error) => {
          console.log(error);
        });

      navigate("/");
    } else {
      displayErrorMessage(sku, name, price, productType);
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
            {/* throwing an error when testing. It wants you to display just 'ADD' or 'SAVE' */}
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
