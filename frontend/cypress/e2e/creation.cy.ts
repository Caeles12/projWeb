describe('template spec', () => {
  it('creation-association', () => {
    cy.visit('http://localhost:4200/');
    /* ==== Generated with Cypress Studio ==== */
    cy.get(
      '.mat-mdc-form-field.ng-tns-c1798928316-0 > .mat-mdc-text-field-wrapper > .mat-mdc-form-field-flex > .mat-mdc-form-field-infix',
    ).click();
    cy.get('#mat-input-0').clear();
    cy.get('#mat-input-0').type('3');
    cy.get('mat-label.ng-tns-c1798928316-1').click();
    cy.get('#mat-input-1').clear('p');
    cy.get('#mat-input-1').type('password');
    cy.get('.mdc-button__label').click();
    cy.get(':nth-child(1) > .mat-mdc-button-touch-target').click();
    cy.get(
      ':nth-child(1) > .mdc-list-item__content > .mat-mdc-list-item-title',
    ).click();
    cy.get('.backdrop').click();
    cy.get('.badge > .mat-mdc-button-touch-target').click();
    cy.get('mat-label.ng-tns-c1798928316-7').click();
    cy.get('#mat-input-3').clear('N');
    cy.get('#mat-input-3').type('NewAsso');
    cy.get(
      '#cdk-step-content-0-0 > .edit-container > div[_ngcontent-ng-c4126982536=""] > .mat-stepper-next > .mdc-button__label',
    ).click();
    cy.get('#mat-mdc-form-field-label-10 > .ng-tns-c1798928316-8').click();
    cy.get('#mat-mdc-chip-list-input-0').clear('p');
    cy.get('#mat-mdc-chip-list-input-0').type('j');
    cy.get('#mat-option-2').click();
    cy.get(
      '#cdk-step-content-0-1 > .edit-container > div[_ngcontent-ng-c4126982536=""] > .mat-stepper-next > .mdc-button__label',
    ).click();
    cy.get('mat-label.ng-tns-c1798928316-10').click();
    cy.get('#mat-input-4').clear('P');
    cy.get('#mat-input-4').type('President');
    cy.get(
      '#cdk-step-content-0-2 > .edit-container > :nth-child(2) > :nth-child(2) > .mdc-button__label',
    ).click();
    cy.contains('NewAsso');
    /* ==== End Cypress Studio ==== */
  });
});
