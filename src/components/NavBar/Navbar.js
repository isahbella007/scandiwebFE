import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../../Pages/AddProduct/Add";
import axios from "axios";
import "./Navbar.css";
import { productDeleteContext } from "../../Pages/Home/Home";

const Navbar = () => {
  const { sku, name, price, productType, productDetail } =
    useContext(ProductContext);

  const { array } = useContext(productDeleteContext);
  // let firstBtnName = "Add";
  // let secondBtnName = "Mass Delete";
  let navbarHeader = "Product List";
  let enableChangeRoute = true;

  let currentUrl = window.location.href;
  var path = currentUrl.split("/").pop();

  if (path === "add-product") {
    enableChangeRoute = false;
    // firstBtnName = "Save";
    // secondBtnName = "Cancel";
    navbarHeader = "Product Add";
  }

  let navigate = useNavigate();
  const changeRoute = () => {
    navigate("/add-product");
  };

  const returnToHome = () => {
    navigate("/");
  };

  const massDelete = () => {
    console.log(array);
    if (array.length === 0) {
      return alert("Please select a product to delete.");
    }
    axios
      .delete("https://scandiwebserver.godwinosakwe.com/products", {
        data: array,
      })
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
    navigate("/");
  };

  const save = async () => {
    console.log("Save detail entered");
    console.log(
      "fetched details from add page on clicking save button",
      sku,
      name,
      price,
      productType,
      productDetail
    );
    await axios
      .post("https://scandiwebserver.godwinosakwe.com/products", {
        SKU: sku,
        name: name,
        price: price,
        productType: productType,
        productDetail: productDetail,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    navigate("/");
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
            {enableChangeRoute ? <p>ADD</p> : <p>Save</p>} {/* throwing an error when testing. It wants you to display just 'ADD' or 'SAVE' */}
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
