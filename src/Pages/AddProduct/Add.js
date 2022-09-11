import React, { createContext, useEffect, useState } from "react";
import Navbar from "../../components/NavBar/Navbar";
import "./Add.css";

export const ProductContext = createContext({
  sku: "",
  name: "",
  price: "",
  productType: "",
  productDetail: "",
});

const Add = () => {
  const [productType, setProductType] = useState("SelectProductType");

  const [dvdInputField, setDvdInputField] = useState(false);
  const [bookInputField, setBookInputField] = useState(false);
  const [furnitureInputField, setFurnitureInputField] = useState(false);

  const handleChange = (e) => {
    setProductType(e.target.value);
  };

  useEffect(() => {
    productType === "DVD" ? setDvdInputField(true) : setDvdInputField(false);

    productType === "Book" ? setBookInputField(true) : setBookInputField(false);

    productType === "Furniture"
      ? setFurnitureInputField(true)
      : setFurnitureInputField(false);
  }, [productType]);

  const [sku, setSku] = useState();
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  //   productType is already gotten.
  const [productDetail, setProductDetail] = useState();

  let [furnitureHeight, setFurnitureHeight] = useState(0);
  let [furnitureWidth, setFurnitureWidth] = useState(0);
  let [furnitureLength, setFurnitureLength] = useState(0);

  useEffect(() => {
    if (furnitureInputField === true) {
      const furnitureDetails = (furnitureHeight += "x".concat(
        (furnitureWidth += "x").concat(furnitureLength)
      ));
      setProductDetail(furnitureDetails);
    }
  }, [furnitureHeight, furnitureWidth, furnitureLength]);

  return (
    <>
      <ProductContext.Provider
        value={{ sku, name, price, productType, productDetail }}
      >
        <Navbar />
      </ProductContext.Provider>

      <div className="form">
        <form id="product_form">
          <label htmlFor="fname">SKU</label>
          <input
            type="text"
            id="sku"
            placeholder="Please provide product Id"
            required
            onChange={(e) => setSku(e.target.value)}
          />
          <div id="sku-error-text"></div>
          <br></br>
          <label htmlFor="lname">Name</label>
          <input
            type="text"
            id="name"
            required
            placeholder="Please provide product name"
            onChange={(e) => setName(e.target.value)}
          />
          <div id="name-error-text"></div>
          <br></br>

          <label htmlFor="price">Price ($)</label>
          <input
            type="number"
            id="price"
            placeholder="Please provide product price"
            required
            min={0.1}
            onChange={(e) => setPrice(e.target.value)}
          />
          <div id="price-error-text"></div>
          <div id="bad-price-input-text"></div>
          <br></br>

          <label htmlFor="Product">Type Switcher</label>
          <select id="productType" value={productType} onChange={handleChange}>
            <option value="SelectProductType">Select your product type</option>
            <option value="DVD">DVD</option>
            <option value="Book">Book</option>
            <option value="Furniture">Furniture</option>
          </select>
          <div id="selector-error-text"></div>
          <br></br>

          {dvdInputField && (
            <>
              <label htmlFor="DvdInput">Size (MB)</label>
              <input
                id="size"
                type="number"
                required
                placeholder="Please, provide size"
                onChange={(e) => setProductDetail(e.target.value)}
              ></input>
              <div id="dvdInputError"></div>
            </>
          )}

          {bookInputField && (
            <>
              <label htmlFor="BookInput">Weight (KG)</label>
              <input
                id="weight"
                type="number"
                required
                placeholder="Please, provide weight"
                onChange={(e) => setProductDetail(e.target.value)}
              ></input>
              <div id="bookInputError"></div>
            </>
          )}

          {furnitureInputField && (
            <>
              <label htmlFor="Furniture Input">Height (CM)</label>
              <input
                id="height"
                type="number"
                required
                placeholder="Please, provide height."
                onChange={(e) => setFurnitureHeight(e.target.value)}
              ></input>
              <div id="heightInputError"></div>
              <br></br>

              <label htmlFor="FurnitureWidth">Width (CM)</label>
              <input
                id="width"
                type="number"
                required
                placeholder="Please, provide width."
                onChange={(e) => setFurnitureWidth(e.target.value)}
              ></input>
              <div id="widthInputError"></div>
              <br></br>

              <label htmlFor="Furniture Length">Length (CM)</label>
              <input
                id="length"
                type="number"
                required
                placeholder="Please, provide length."
                onChange={(e) => setFurnitureLength(e.target.value)}
              ></input>
              <div id="lengthInputError"></div>
            </>
          )}
        </form>
      </div>
    </>
  );
};
export default Add;
