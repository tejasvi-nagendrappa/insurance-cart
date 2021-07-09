import { APP_DATA_KEY, INSURANCE_MODULES_CONFIG } from "./AppConstants";

const getDataFromLocalStorage = () => {
  let itemsInCart = [];
  if (localStorage) {
    itemsInCart = JSON.parse(localStorage.getItem(APP_DATA_KEY)) || itemsInCart;
  }
  return itemsInCart;
}

const setDataToLocalStorage = (data) => {
  try {
    const appDataAsString = JSON.stringify(data);
    localStorage.setItem(APP_DATA_KEY, appDataAsString);
  }
  catch(e) {
    console.error("Error while saving items to local storage");
  }
}

const getInsuranceConfigByType = (insuranceType) => {
  let formConfig = INSURANCE_MODULES_CONFIG.find(
    ({ type }) => insuranceType === type
  );

  if (!formConfig) {
    formConfig = INSURANCE_MODULES_CONFIG[0];
  }
  return formConfig;
}

const getTotalCartPrice = (cartItems) => {
  const totalPrice = cartItems.reduce((currValue, { price }) => currValue + Number(price), 0);
  return totalPrice.toFixed(2);
}

export {
  getInsuranceConfigByType,
  getDataFromLocalStorage,
  setDataToLocalStorage,
  getTotalCartPrice
}
