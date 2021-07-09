import {
  INSURANCE_MODULES_CONFIG, APP_DATA_KEY
} from '../../src/utils/AppConstants';

describe('Landing Page Tests', () => {
  before(() => {
    cy.visit('/');
  })

  it('Check for presence of Insurance shop in title', () => {
    cy.get('.ant-row').first('.InsuranceModuleCard').should('not.be.disabled');
  });

  it('Insurance modules should be present according to config', () => {
    cy.get('.ant-row').find('.InsuranceModuleCard').should('have.length', INSURANCE_MODULES_CONFIG.length)
  });

  it('Badge Count should be displayed according to items', () => {
    let items = [{ coverage: 100, price: 30 }, { coverage: 2990, price: 300 }]
    localStorage.setItem(APP_DATA_KEY, JSON.stringify(items));
    cy.visit('/');
    cy.get('.ant-scroll-number-only-unit').should('have.html', `${items.length}`);
    cy.clearLocalStorage();
  });

})
