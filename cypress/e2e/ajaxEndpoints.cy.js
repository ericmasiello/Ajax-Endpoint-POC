describe('Ajax Endpoints', () => {
  it('`api/content` returns a form', () => {
    cy.visit('http://localhost:3000/api/example?title=This%20is%20a%20test&html=true&hydrateArgs=4,7,0,22');

    // Verify 4 form fields are present
    cy.get('input').should('have.length', 4);

    // Verify the initial sum is correct
    cy.get('[data-testid="sum"]')
      .contains(/Sum: 33/)
      .should('exist');

    // update form
    cy.get('input').eq(0).clear().type(10);

    // Verify the sum was updated correctly
    cy.get('[data-testid="sum"]')
      .contains(/Sum: 39/)
      .should('exist');
  });
});
