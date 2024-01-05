describe('template spec', () => {
  /* ==== Test Created with Cypress Studio ==== */
  it('users-list', function () {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('http://localhost:4200/');
    cy.get('mat-label.ng-tns-c1798928316-0').click();
    cy.get('#mat-input-0').clear('3');
    cy.get('#mat-input-0').type('3');
    cy.get('mat-label.ng-tns-c1798928316-1').click();
    cy.get('#mat-input-1').clear('p');
    cy.get('#mat-input-1').type('password');
    cy.get('.mdc-button__label').click();
    cy.get(':nth-child(1) > .mat-mdc-button-touch-target').click();
    cy.get('.mat-mdc-action-list > :nth-child(3)').click();
    cy.get('.backdrop').click();
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('associations-list', function () {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('http://localhost:4200/');
    cy.get(
      '#mat-mdc-form-field-label-0 > .mat-mdc-form-field-required-marker',
    ).click();
    cy.get('#mat-input-0').clear('3');
    cy.get('#mat-input-0').type('3');
    cy.get('#mat-input-1').clear('p');
    cy.get('#mat-input-1').type('password');
    cy.get('.mdc-button').click();
    cy.get(':nth-child(1) > .mat-mdc-button-touch-target').click();
    cy.get(
      ':nth-child(1) > .mdc-list-item__content > .mat-mdc-list-item-title',
    ).click();
    cy.get('.backdrop').click();
    /* ==== End Cypress Studio ==== */
  });
});
