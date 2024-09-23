beforeEach(() => {
  cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
    statusCode: 200,
    fixture: 'orders',
  }).as('GET_ALL_ORDERS');
  cy.visit('http://localhost:3000');
});

describe('Page Load', () => {
  it('loads the initial content', () => {
    cy.get('h1').should('contain', 'Burrito Builder');
    cy.get('form').find('button.ingredient-btn').should('have.length', 12);
    cy.get('form').find('p').should('contain', 'Order: Nothing selected');
    cy.get('form').find('button:last-child').should('contain', 'Submit Order');
    cy.get('section').find('p').should('contain', 'No orders yet!');
  });

  it('fetches all orders & displays them on the DOM', () => {
    cy.get('section').find('div.order').should('have.length', 0);
    cy.get('section').find('div.order').should('have.length', 3);
    cy.get('div.order:first-child').find('h3').should('contain', 'Pat');
    cy.get('div.order:first-child').find('li').should('have.length', 5);
  });
});
