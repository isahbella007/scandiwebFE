export const validNumber = (value) => {
  const numberRegex = /^[0-9]\d*(\.\d+)?$/;
  return value.match(numberRegex);
};
export const formProcess = (sku, name, price, productType, productDetail) => {
  let processSku = true;
  let processPrice = true;
  let processOthers = true;
  if (sku === "" || name === "") {
    processSku = false;
  }

  if (price) {
    if (
      !validNumber(price) ||
      price === "" ||
      price === undefined ||
      price === 0
    ) {
      processPrice = false;
    }
  } else {
    processPrice = false;
  }

  if (
    productType === "Select Product Type" ||
    productDetail === "" ||
    productDetail === "undefined"
  ) {
    processOthers = false;
  }
  return processSku && processPrice && processOthers;
};
