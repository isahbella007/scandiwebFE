import React, { useState } from "react";
import FormInput from "../../components/FormInput/FormInput";
import "../../components/FormInput/FormInput.css";
import Navbar from "../../components/NavBar/Navbar";
import "./Add.css";
import {
  formInputs,
  dvdFormInput,
  bookFormInput,
  furnitureFormInput,
} from "../../constants/forms";
import { ProductContext } from "../../util/ProductContext";

const Add = () => {
  const [values, setValues] = useState({
    sku: "",
    name: "",
    price: "",
    productType: "SelectProductType",
    productDetail: "",
    dvdSize: "",
    bookWeight: "",
    furnitureHeight: "",
    furnitureWidth: "",
    furnitureLength: "",
  });

  let dvdInput = false;
  let bookInput = false;
  let furnitureInput = false;

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSelect = (e) => {
    setValues({ ...values, [e.target.id]: e.target.value });
  };

  const transform = (e) => {
    var x = document.getElementById(e.target.id);
    if (x.value < 0) {
      x.value = x.value * -1;
    }
  };

  if (values.productType === "DVD") {
    dvdInput = true;
    values.productDetail = values.dvdSize;
    values.bookWeight = "";
    values.furnitureHeight = "";
    values.furnitureWidth = "";
    values.furnitureLength = "";
  } else if (values.productType === "Book") {
    bookInput = true;
    values.productDetail = values.bookWeight;
    values.dvdSize = "";
    values.furnitureHeight = "";
    values.furnitureWidth = "";
    values.furnitureLength = "";
  } else if (values.productType === "Furniture") {
    furnitureInput = true;
    values.productDetail = "";
    values.bookWeight = "";
    values.dvdSize = "";
  }
  if (
    values.furnitureHeight !== "" &&
    values.furnitureWidth !== "" &&
    values.furnitureLength !== ""
  ) {
    values.productDetail = values.furnitureHeight
      .concat("x")
      .concat(values.furnitureWidth.concat("x"))
      .concat(values.furnitureLength);
  }

  return (
    <>
      <ProductContext.Provider value={{ ...values }}>
        <Navbar />
      </ProductContext.Provider>
      <form id="product_form">
        {formInputs.map((items) => (
          <FormInput
            key={items.id}
            {...items}
            onChange={handleChange}
            transform={transform}
          ></FormInput>
        ))}
        <div className="form-header-text">
          <label>Type Switcher</label>
          <p className="form-text">*</p>
        </div>

        <select id="productType" onChange={handleSelect} required>
          <option>Select Product Type</option>
          <option>DVD</option>
          <option>Book</option>
          <option>Furniture</option>
        </select>
        <div id="type-switcher-error"></div>
        {dvdInput && (
          <>
            {dvdFormInput.map((items) => (
              <FormInput
                key={items.id}
                {...items}
                onChange={handleChange}
                transform={transform}
              ></FormInput>
            ))}
          </>
        )}
        {bookInput && (
          <>
            {bookFormInput.map((items) => (
              <FormInput
                key={items.id}
                {...items}
                onChange={handleChange}
                transform={transform}
              ></FormInput>
            ))}
          </>
        )}
        {furnitureInput && (
          <>
            {furnitureFormInput.map((items) => (
              <FormInput
                key={items.id}
                {...items}
                onChange={handleChange}
                transform={transform}
              ></FormInput>
            ))}
          </>
        )}
      </form>
    </>
  );
};
export default Add;
