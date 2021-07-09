import { INSURANCE_MODULES_CONFIG } from '../../src/utils/AppConstants';

describe('Insurance Form Tests', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('.ant-row').first('.InsuranceModuleCard').find('.InsuranceModuleCard__btn').first().click();
  });

  afterEach(() => {
  });

  it('Check if Form is loaded', () => {
    cy.get('.InsuranceForm').should('be.visible');
  });

  it('Validate Initial Form Values', () => {
    const { minCover, type, risk } = INSURANCE_MODULES_CONFIG[0];
    const price = (minCover * (risk / 100)).toFixed(2);
    cy.get('.InsuranceForm').find('.ant-select-selection-item').should('have.html', type);
    cy.get('.InsuranceForm').find('.ant-slider-handle').should('have.attr', 'aria-valuenow', minCover);
    cy.get('#Insurance_Form_price').should('have.value', price);
    cy.get('.InsuranceForm__cancelBtn').should('have.text', 'Cancel');
    cy.get('.InsuranceForm__okBtn').should('have.text', 'Add to Cart');
    cy.get('.InsuranceForm__cancelBtn').click();
  });

  it('Updating Coverage Amount should update the Price', () => {
    const { minCover, type, risk } = INSURANCE_MODULES_CONFIG[0];

    const noOfSteps = 100;
    const slider = cy.get('.InsuranceForm').find('.ant-slider-handle');
    slider.focus();
    const arrows = '{rightarrow}'.repeat(noOfSteps);
    slider.type(arrows);

    const currCoverage = minCover + noOfSteps;
    cy.get('.InsuranceForm').find('.ant-slider-handle').should('have.attr', 'aria-valuenow', currCoverage);

    const updatedPrice = (currCoverage * (risk / 100)).toFixed(2);
    cy.get('#Insurance_Form_price').should('have.value', updatedPrice);

    cy.get('.InsuranceForm__cancelBtn').click();
  });

  it('Adding to Cart should close the Form and update Badge Icon Count', () => {
    cy.get('.InsuranceForm__okBtn').click();
    cy.get('.InsuranceForm').should('not.exist');
    cy.get('.ant-scroll-number-only-unit').should('have.html', '1');
  });

})
