import { APP_DATA_KEY } from "../../src/utils/AppConstants";
import {
  getTotalCartPrice, getDataFromLocalStorage, setDataToLocalStorage
} from '../../src/utils/Helpers';

describe('Helper Utitlity Tests - getTotalCartPrice', () => {
  it('should give the right cart price by adding items in cart', () => {
    const cartData = [{ price: "10.24" }, { price: "20.30" }];
    const totalPrice = getTotalCartPrice(cartData);
    expect(totalPrice).equal("30.54");
  });

  it('Empty cart should get price as Zero', () => {
    const cartData = [];
    const totalPrice = getTotalCartPrice(cartData);
    expect(totalPrice).equal("0.00");
  });
});

describe('Helper Utitlity Tests - getDataFromLocalStorage', () => {

  beforeEach(() => {
    const mockItems = [{ id: 1 }, { id: 2 }];
    localStorage.setItem(APP_DATA_KEY, JSON.stringify(mockItems));
  });
  it('should get items from local storage', () => {
    const items = getDataFromLocalStorage();
    expect(items.length).equal(2);
    expect(items[0].id).eq(1);
    cy.clearLocalStorage();
  });
});


describe('Helper Utitlity Tests - setDataToLocalStorage', () => {

  it('should set items to local storage', () => {
    const mockItems = [{ id: 1 }, { id: 2 }];
    const stringifiedItems = JSON.stringify(mockItems);
    setDataToLocalStorage(mockItems)
    const itemsInStorage = localStorage.getItem(APP_DATA_KEY);
    expect(itemsInStorage).equal(stringifiedItems);
    cy.clearLocalStorage();
  });
});
