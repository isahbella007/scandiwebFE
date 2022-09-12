let errorMessage = "Please, submit required data";
let successMessage = "";

export const setError = (element, message) => {
  element.innerHTML = message;
};

export const setSuccess = (element, message) => {
  element.innerHTML = message;
};

export const validNumber = (value) => {
  const numberRegex = /^[0-9]\d*(\.\d+)?$/;
  return value.match(numberRegex);
};
export const formProcess = (sku, name, price, productType, productDetail) => {
  let processSku = true;
  let processPrice = true;
  let processOthers = true;
  if (sku === "" || name === "") {
    console.log("Sku has no value", sku);
    processSku = false;
  }

  if (price) {
    console.log(price);
    if (!validNumber(price) || price === "" || price === undefined) {
      processPrice = false;
    }
  } else {
    processPrice = false;
  }

  if (productType === "SelectProductType" || productDetail === undefined) {
    processOthers = false;
  }
  return processSku && processPrice && processOthers;
};
export const displayErrorMessage = (
  sku,
  name,
  price,
  productType,
  productDetail
) => {
  const skuElement = document.getElementById("sku-error-text");
  const nameElement = document.getElementById("name-error-text");
  const priceElement = document.getElementById("price-error-text");
  const badPriceElement = document.getElementById("bad-price-input-text");
  const productTypeElement = document.getElementById("selector-error-text");

  if (sku === "" || sku === undefined) {
    setError(skuElement, errorMessage);
  } else {
    setSuccess(skuElement, successMessage);
  }

  if (name === "" || name === undefined) {
    setError(nameElement, errorMessage);
  } else {
    setSuccess(nameElement, successMessage);
  }

  if (price === undefined || price === "") {
    setError(priceElement, errorMessage);
  } else if (!validNumber(price)) {
    setError(badPriceElement, "Please, provide a positive number");
  } else {
    setSuccess(badPriceElement, successMessage);
  }

  if (productType === "SelectProductType") {
    setError(productTypeElement, "Please, select a valid product type");
  } else {
    setSuccess(productTypeElement, successMessage);
  }

  if (productType === "DVD") {
    dvdValidation();
  } else if (productType === "Book") {
    bookValidation();
  } else if (productType === "Furniture") {
    furnitureValidation();
  }
};

export const dvdValidation = () => {
  const sizeElement = document.getElementById("dvdInputError");
  var sizeValue = document.getElementById("size").value;
  if (sizeValue === "") {
    setError(sizeElement, errorMessage);
  } else if (!validNumber(sizeValue)) {
    setError(sizeElement, "Please, provide a positive number");
  } else {
    setSuccess(sizeElement, successMessage);
  }
};

export const bookValidation = () => {
  var bookWeightValue = document.getElementById("weight").value;
  const bookElement = document.getElementById("bookInputError");
  console.log(bookWeightValue);
  if (bookWeightValue === "") {
    setError(bookElement, errorMessage);
  } else if (!validNumber(bookWeightValue)) {
    setError(bookElement, "Please, provide a number");
  } else {
    setSuccess(bookElement, successMessage);
  }
};

export const furnitureValidation = () => {
  var furnitureHeightValue = document.getElementById("height").value;
  var furnitureWidthValue = document.getElementById("width").value;
  var furnitureLengthValue = document.getElementById("length").value;

  const furnitureHeight = document.getElementById("heightInputError");
  const furnitureWidth = document.getElementById("widthInputError");
  const furnitureLength = document.getElementById("lengthInputError");

  if (furnitureHeightValue === "" || furnitureHeightValue === undefined) {
    setError(furnitureHeight, errorMessage);
  } else if (!validNumber(furnitureHeightValue)) {
    setError(furnitureHeight, "Please, provide a number");
  } else {
    setSuccess(furnitureHeight, successMessage);
  }

  if (furnitureWidthValue === "" || furnitureWidthValue === undefined) {
    setError(furnitureWidth, errorMessage);
  } else if (!validNumber(furnitureWidthValue)) {
    setError(furnitureWidth, "Please, provide a number");
  } else {
    setSuccess(furnitureWidth, successMessage);
  }

  if (furnitureLengthValue === "" || furnitureLengthValue === undefined) {
    setError(furnitureLength, errorMessage);
  } else if (!validNumber(furnitureWidthValue)) {
    setError(furnitureLength, "Please, provide a number");
  } else {
    setSuccess(furnitureLength, successMessage);
  }
};
