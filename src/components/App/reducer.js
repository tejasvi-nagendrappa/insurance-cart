import {
  ADD_ITEM_TO_CART,
  DELETE_ITEM_FROM_CART,
  UPDATE_ITEM_IN_CART,
  DISPLAY_INSURANCE_FORM,
  HIDE_INSURANCE_FORM,
} from "../../utils/AppConstants";
import { setDataToLocalStorage } from "../../utils/Helpers";

const addItemToCart = (state, payload) => {
  const { data = [] } = state;
  const { values } = payload
  const id = data.length + 1;
  const updatedItems = [...data, { ...values, id }];
  setDataToLocalStorage(updatedItems);
  return {
    ...state,
    data: updatedItems,
  };

};

const deleteItemFromCart = (state, payload) => {
  const { data } = state;
  const { index } = payload;

  let itemsAfterDeletion = [...data];
  itemsAfterDeletion.splice(index, 1);
  setDataToLocalStorage(itemsAfterDeletion);
  return {
    ...state,
    data: itemsAfterDeletion
  };

};

const updateItemInCart = (state, payload) => {
  const { data } = state;
  const { index, values, id } = payload;

  let updatedCartItems = [...data];
  updatedCartItems[index] = { ...values, id };

  setDataToLocalStorage(updatedCartItems);

  return {
    ...state,
    data: updatedCartItems,
  };
};

const displayInsuranceForm = (state, payload) => {
  return {
    ...state,
    formControls: {
      displayForm: true,
      ...payload,
    }
  };
};

const hideInsuranceForm = (state) => {
  return {
    ...state,
    formControls: {
      displayForm: false,
    }
  };
};

const reducer = (state, action) => {
  const { payload, type } = action;
  switch (type) {
    case ADD_ITEM_TO_CART:
      return addItemToCart(state, payload);
    case DELETE_ITEM_FROM_CART:
      return deleteItemFromCart(state, payload);
    case UPDATE_ITEM_IN_CART:
      return updateItemInCart(state, payload);
    case DISPLAY_INSURANCE_FORM:
      return displayInsuranceForm(state, payload);
    case HIDE_INSURANCE_FORM:
      return hideInsuranceForm(state);
    default:
      return state;
  }
}

export default reducer;
