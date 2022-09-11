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

  const save = async () => {
    if (
      sku !== undefined &&
      name !== undefined &&
      price !== undefined &&
      productType !== undefined &&
      productDetail !== undefined
    ) {
      await axios
        .post(liveUrl, {
          SKU: sku,
          name: name,
          price: price,
          productType: productType,
          productDetail: productDetail,
        })
        .then((response) => {
          if (response.data != "") {
            alert(response.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });

      navigate("/");
    } else {
      var priceRegex = /^[0-9]\d*(\.\d+)?$/;
      var numberRegex = /^[1-9]\d*(\.\d+)?$/;

      if (sku === undefined) {
        document.getElementById("sku-error-text").innerHTML =
          "Please, submit required data";
      } else {
        document.getElementById("sku-error-text").innerHTML = "";
      }

      if (name === undefined) {
        document.getElementById("name-error-text").innerHTML =
          "Please, submit required data";
      } else {
        document.getElementById("name-error-text").innerHTML = "";
      }

      if (price === undefined) {
        document.getElementById("price-error-text").innerHTML =
          "Please, submit required data";
      } else {
        document.getElementById("price-error-text").innerHTML = "";
      }

      if (!document.getElementById("price").value.match(priceRegex)) {
        document.getElementById("bad-price-input-text").innerHTML =
          "Please, provide a number";
      } else {
        document.getElementById("bad-price-input-text").innerHTML = "";
      }

      if (productType === "SelectProductType") {
        document.getElementById("selector-error-text").innerHTML =
          "Please, select product type";
      } else {
        document.getElementById("selector-error-text").innerHTML = "";
      }
      if (productType === "DVD") {
        var sizeValue = document.getElementById("size").value;
        if (!sizeValue.match(numberRegex)) {
          document.getElementById("dvdInputError").innerHTML =
            "Please, provide a number";
        } else {
          document.getElementById("dvdInputError").innerHTML = "";
        }
      }

      if (productType === "Book") {
        var bookWeightValue = document.getElementById("weight").value;
        if (!bookWeightValue.match(numberRegex)) {
          document.getElementById("bookInputError").innerHTML =
            "Please, provide a number";
        } else {
          document.getElementById("bookInputError").innerHTML = "";
        }
      }
      // var formPrice = document.getElementById('price').value;

      if (productType === "Furniture") {
        var furnitureHeightValue = document.getElementById("height").value;
        var furnitureWidthValue = document.getElementById("width").value;
        var furnitureLengthValue = document.getElementById("length").value;

        if (!furnitureHeightValue.match(numberRegex)) {
          document.getElementById("heightInputError").innerHTML =
            "Please, provide a number";
        } else {
          document.getElementById("heightInputError").innerHTML = "";
        }

        if (!furnitureWidthValue.match(numberRegex)) {
          document.getElementById("widthInputError").innerHTML =
            "Please, provide a number";
        } else {
          document.getElementById("widthInputError").innerHTML = "";
        }

        if (!furnitureLengthValue.match(numberRegex)) {
          document.getElementById("lengthInputError").innerHTML =
            "Please, provide a number";
        } else {
          document.getElementById("lengthInputError").innerHTML = "";
        }
      }
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
