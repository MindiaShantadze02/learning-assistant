// To create a bigger timeout for finding elements
Cypress.Commands.add('getElement', (element) => {
    return cy.get(element, { timeout: 30000 });
})