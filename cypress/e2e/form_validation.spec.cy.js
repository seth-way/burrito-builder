beforeEach(() => {
  cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
    statusCode: 200,
    fixture: 'orders',
  }).as('GET_ALL_ORDERS');
  cy.intercept(
    'POST',
    'http://localhost:3001/api/v1/orders',
    cy.spy().as('CREATE_ORDER')
  );
  cy.visit('http://localhost:3000');
  cy.get('button').contains('Submit Order').as('submit');
});

describe('Should not submit form if necessary info is not provided', () => {
  it("shouldn't submit if no name is provided", () => {
    cy.get('button').contains('beans').click();
    cy.get('button').contains('steak').click();
    cy.get('@submit').click();
    cy.get('@CREATE_ORDER').should('have.not.been.called');
  });
  it("shouldn't submit if no ingredients are provided", () => {
    cy.get('input').type('Seth');
    cy.get('@submit').click();
    cy.get('@CREATE_ORDER').should('have.not.been.called');
  });
  it("shouldn't submit if neither are provided", () => {
    cy.get('@submit').click();
    cy.get('@CREATE_ORDER').should('have.not.been.called');
  });
});
