import axios from "axios";
import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/NavBar/Navbar";
import { ProductContext } from "../../util/ProductContext";
import "./Home.css";

const Home = () => {
  const [result, setResult] = useState();
  const [selectedId, setSelectedId] = useState([]);
  const liveUrl = process.env.REACT_APP_LIVE_URL
  useEffect(() => {
    axios
      .get(liveUrl, {
        withCredentials: true,
      })
      .then((response) => {
        setResult(response.data.data);
      })
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
        <ProductContext.Provider value={{ array: selectedId }}>
          <Navbar />
        </ProductContext.Provider>
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
