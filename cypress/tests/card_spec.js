import { INSURANCE_MODULES_CONFIG } from '../../src/utils/AppConstants';

describe('Card Tests', () => {
  before(() => {
    cy.visit('/');
  })

  it('Check for Card Title', () => {
    const title = `${INSURANCE_MODULES_CONFIG[0].type} Insurance`;
    cy.get('.ant-row').first('.InsuranceModuleCard').find('.ant-card-meta-title').first().should('have.html', title);
  });

  it('Purchase button should not be disabled', () => {
    cy.get('.ant-row').first('.InsuranceModuleCard').find('.InsuranceModuleCard__btn').first().should('not.be.disabled');
  });

  it('Purchase button should open insurance form', () => {
    cy.get('.ant-row').first('.InsuranceModuleCard').find('.InsuranceModuleCard__btn').first().click();
    cy.get('.InsuranceForm').should('be.visible');
    cy.get('.InsuranceForm').get('.ant-modal-footer').contains('Cancel').click();
  })

})
