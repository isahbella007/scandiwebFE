import React, { createContext, useEffect, useState } from "react";
import Navbar from "../../components/NavBar/Navbar";
import "./Add.css";

export const ProductContext = createContext({sku: "", name: "", price: "", productType: "", productDetail: ""})

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

  let [furnitureHeight, setFurnitureHeight] = useState();
  let [furnitureWidth, setFurnitureWidth] = useState();
  let [furnitureLength, setFurnitureLength] = useState();

  useEffect(() => {
    if (furnitureInputField === true) {
    //   console.log("object");
      const furnitureDetails = (furnitureHeight += "x".concat(
        (furnitureWidth += "x").concat(furnitureLength)
      ));
      setProductDetail(furnitureDetails);
    }
  }, [furnitureHeight, furnitureWidth, furnitureLength]);


  
//   console.log(
//     "Item to send when I click on the save button are: ",
//     sku,
//     name,
//     price,
//     productType,
//     productDetail
//   );

  return (
    <>
    <ProductContext.Provider value = {{sku, name, price, productType, productDetail}}>
        <Navbar  />
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

          <label htmlFor="lname">Name</label>
          <input
            type="text"
            id="name"
            required
            onInvalid={(e) =>
              e.target.setCustomValidity("Please,submit required data")
            }
            onInput={(e) => e.target.setCustomValidity("")}
            placeholder="Please provide product name"
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="price">Price ($)</label>
          <input
            type="number"
            id="price"
            placeholder="Please provide product price"
            required
            onInvalid={(e) =>
              e.target.setCustomValidity(
                "Please, provide the data of indicated type"
              )
            }
            onInput={(e) => e.target.setCustomValidity("")}
            onChange={(e) => setPrice(e.target.value)}
          />

          <label htmlFor="Product">Type Switcher</label>
          <select id="productType" value={productType} onChange={handleChange}>
            <option value="SelectProductType">Select your product type</option>
            <option value="DVD">DVD</option>
            <option value="Book">Book</option>
            <option value="Furniture">Furniture</option>
          </select>

          {dvdInputField && (
            <>
              <label htmlFor="DvdInput">Size (MB)</label>
              <input
                id="size"
                type="number"
                required
                onInvalid={(e) =>
                  e.target.setCustomValidity(
                    "Please, provide the data of indicated type"
                  )
                }
                onInput={(e) => e.target.setCustomValidity("")}
                placeholder="Please provide size. E.g...400MB"
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
                onInvalid={(e) =>
                  e.target.setCustomValidity(
                    "Please, provide the data of indicated type"
                  )
                }
                onInput={(e) => e.target.setCustomValidity("")}
                placeholder="Please provide weight. E.g: 2kg"
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
                onInvalid={(e) =>
                  e.target.setCustomValidity(
                    "Please, provide the data of indicated type"
                  )
                }
                onInput={(e) => e.target.setCustomValidity("")}
                placeholder="Please provide height. E.g:45"
                onChange={(e) => setFurnitureHeight(e.target.value)}
              ></input>
              <div id="heightInputError"></div>

              <label htmlFor="FurnitureWidth">Width (CM)</label>
              <input
                id="width"
                type="number"
                required
                onInvalid={(e) =>
                  e.target.setCustomValidity(
                    "Please, provide the data of indicated type"
                  )
                }
                onInput={(e) => e.target.setCustomValidity("")}
                placeholder="Please provide width. E.g:45"
                onChange={(e) => setFurnitureWidth(e.target.value)}
              ></input>
              <div id="widthInputError"></div>

              <label htmlFor="Furniture Length">Length (CM)</label>
              <input
                id="length"
                type="number"
                required
                onInvalid={(e) =>
                  e.target.setCustomValidity(
                    "Please, provide the data of indicated type"
                  )
                }
                onInput={(e) => e.target.setCustomValidity("")}
                placeholder="Please provide length. E.g:45"
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
