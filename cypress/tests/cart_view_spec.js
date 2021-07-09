import { APP_DATA_KEY } from "../../src/utils/AppConstants";
import { getTotalCartPrice } from "../../src/utils/Helpers";

const mockData = [
  {
    "type": "Bike",
    "coverage": 3000,
    "price": "900.00",
    "id": 3
  },
  {
    "type": "Jewelry",
    "coverage": 3332,
    "price": "166.60",
    "id": 4
  }
];

describe('Cart View Tests', () => {

  beforeEach(() => {
    localStorage.setItem(APP_DATA_KEY, JSON.stringify(mockData));
    cy.visit('/');
    cy.get('.App__pageheader_btn').click();
  });

  after(() => {
    cy.clearLocalStorage();
  })

  it('Check if Cart is displayed', () => {
    cy.get('.CartView').should('be.visible');
  });

  it('Check if Cart is not visible after clicking outside', () => {
    cy.get('body').click();
    cy.get('.CartView').should('not.exist');
  });

  it('Cart should not exist after clicking close button', () => {
    cy.get('.ant-drawer-close').click();
    cy.get('.CartView').should('not.exist');
  });

  it('Check if Cart Items are dispalyed', () => {
    cy.get('.ant-spin-container').should('be.visible');
  });

  it('Match the number of list items in localstorage vs list in cart', () => {
    cy.get('.ant-spin-container').find('ul > li').should('have.length', mockData.length);
  });

  it('Delete button should remove item from list', () => {
    cy.get('.ant-spin-container').find('ul > li').should('have.length', 2);
    cy.get('.ant-spin-container').find('ul').find('.CartItem__deleteBtn').first().click();
    cy.get('.ant-spin-container').find('ul > li').should('have.length', mockData.length - 1);
    cy.get('body').click();
  });

  it('Edit button should display Insurance Form in Edit Mode', () => {
    cy.get('.ant-spin-container').find('ul').find('.CartItem__editBtn').first().click();
    cy.get('.InsuranceForm').should('be.visible');
    cy.get('.InsuranceForm__okBtn').should('have.text', 'Update Cart');
    cy.get('.InsuranceForm__cancelBtn').click();
  });

  it('Price of cart should be calculated total of cart items', () => {
    const price = getTotalCartPrice(mockData);
    cy.get('.ant-drawer-footer').should('have.text', `Total Price : ${price} €`)
  });
})
