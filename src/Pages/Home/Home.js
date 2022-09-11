import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/NavBar/Navbar";
import "./Home.css";

export const productDeleteContext = createContext({ array: "" });

const Home = () => {
  const [result, setResult] = useState();
  const [selectedId, setSelectedId] = useState([]);
  // const url = "http://localhost:8080/products";
  const liveUrl = "https://scandiwebserver.godwinosakwe.com/products";
  useEffect(() => {
    axios
      .get(liveUrl, {
        withCredentials: true,
      })
      .then((response) => {
        setResult(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const selectProducts = (id) => {
    if (selectedId.includes(id)) {
      const index = selectedId.indexOf(id);
      selectedId.splice(index, 1);
    } else {
      selectedId.push(id);
    }
    setSelectedId(selectedId);
  };

  return (
    <>
      <div className="home-container">
        <productDeleteContext.Provider value={{ array: selectedId }}>
          <Navbar />
        </productDeleteContext.Provider>
        <div className="cards-container">
          {result?.map((item) => (
            <div className="product-cards" key={item.SKU}>
              <div className="checkbox">
                <input
                  type="checkbox"
                  className="delete-checkbox"
                  value={item.SKU}
                  onClick={(e) => selectProducts(e.target.value)}
                ></input>
              </div>
              <div className="card-details">
                <p>{item.SKU}</p>
                <p>{item.name}</p>
                <p>${item.price}</p>
                {item.productType === "Furniture" && (
                  <p>Dimensions: {item.productDetail}</p>
                )}
                {item.productType === "Book" && (
                  <p>Weight: {item.productDetail} kg</p>
                )}
                {item.productType === "DVD" && (
                  <p>Size: {item.productDetail} MB</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Home;
