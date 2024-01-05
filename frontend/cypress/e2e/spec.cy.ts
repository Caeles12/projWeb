describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('http://localhost:4200/');
    cy.contains('Administration');
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('login', function () {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('http://localhost:4200/');
    cy.get('#mat-input-0').clear('3');
    cy.get('#mat-input-0').type('3');
    cy.get('#mat-input-1').clear('p');
    cy.get('#mat-input-1').type('password');
    cy.get('.mdc-button__label').click();
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('login-fail', function () {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('http://localhost:4200/');
    cy.get('#mat-input-0').clear('t');
    cy.get('#mat-input-0').type('toto');
    cy.get('#mat-input-1').clear('m');
    cy.get('#mat-input-1').type('mdp123');
    cy.get('.mdc-button__label').click();
    cy.url().should('include', '/login');
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('login-logout', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('http://localhost:4200/');
    cy.get('.mat-mdc-form-field.ng-tns-c1798928316-0 > .mat-mdc-text-field-wrapper > .mat-mdc-form-field-flex > .mat-mdc-form-field-infix').click();
    cy.get('#mat-input-0').clear();
    cy.get('#mat-input-0').type('3');
    cy.get('.mat-form-field-hide-placeholder > .mat-mdc-text-field-wrapper > .mat-mdc-form-field-flex > .mat-mdc-form-field-infix').click();
    cy.get('#mat-input-1').clear();
    cy.get('#mat-input-1').type('password{enter}');
    cy.get('.mdc-button').click();
    cy.get(':nth-child(6) > .mat-mdc-button-touch-target').click();
    /* ==== End Cypress Studio ==== */
  });
});
