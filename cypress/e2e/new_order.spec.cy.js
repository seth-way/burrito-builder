beforeEach(() => {
  cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
    statusCode: 200,
    fixture: 'orders',
  }).as('GET_ALL_ORDERS');
  cy.intercept('POST', 'http://localhost:3001/api/v1/orders', {
    statusCode: 201,
    fixture: 'order',
  }).as('POST_NEW_ORDER');
  cy.visit('http://localhost:3000');
});

describe('New order form should create new order', () => {
  it('create new order on form submit', () => {
    cy.get('input').type('Seth')
    cy.get('.ingredient-btn').contains('beans').click();
    cy.get('.ingredient-btn').contains('jalapenos').click();
    cy.get('button').contains('Submit Order').click();
    cy.get('section').find('div.order').should('have.length', 4);
    cy.get('div.order:last-child').find('h3').should('contain', 'Seth');
    cy.get('div.order:last-child').find('ul.ingredient-list > li').should('have.length', 2);
  });
});
