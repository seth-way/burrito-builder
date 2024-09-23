beforeEach(() => {
  cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
    statusCode: 200,
    fixture: 'orders',
  }).as('GET_ALL_ORDERS');
  cy.visit('http://localhost:3000');
});

describe('empty spec', () => {
  it('passes', () => {});
});
