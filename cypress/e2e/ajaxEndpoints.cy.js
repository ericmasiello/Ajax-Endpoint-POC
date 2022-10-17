describe('empty spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/api/content?title=hello%20world&html=true&hydrateArgs=4,7,0,22');

    cy.get('input').should('exist');
  });
});
