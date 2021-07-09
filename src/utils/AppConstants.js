export const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART';
export const DELETE_ITEM_FROM_CART = 'DELETE_ITEM_FROM_CART';
export const UPDATE_ITEM_IN_CART = 'UPDATE_ITEM_IN_CART';

export const APP_DATA_KEY = 'insurance_cart';

export const DISPLAY_INSURANCE_FORM = 'DISPLAY_INSURANCE_FORM';
export const HIDE_INSURANCE_FORM = 'HIDE_INSURANCE_FORM';

export const INSURANCE_TYPES = {
  BIKE: 'Bike',
  JEWELRY: 'Jewelry',
  ELECTRONICS: 'Electronics',
  SPORTS_EQUIPMENT: 'Sports Equipment'
};

export const INSURANCE_MODULES_CONFIG = [
  {
    type: INSURANCE_TYPES.BIKE,
    minCover: 1,
    maxCover: 3000,
    risk: 30
  },
  {
    type: INSURANCE_TYPES.JEWELRY,
    minCover: 500,
    maxCover: 10000,
    risk: 5,
  },
  {
    type: INSURANCE_TYPES.ELECTRONICS,
    minCover: 500,
    maxCover: 6000,
    risk: 35
  },
  {
    type: INSURANCE_TYPES.SPORTS_EQUIPMENT,
    minCover: 1,
    maxCover: 20000,
    risk: 30
  }
];
