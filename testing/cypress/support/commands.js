// To create a bigger timeout for finding elements
Cypress.Commands.add('getElement', (element) => {
    return cy.get(element, { timeout: 30000 });
})

// To intercept Google API request, and get the quiz from the response
Cypress.Commands.add('getAIQuizResponse', () => {
    cy.intercept('POST', '**/models/gemini-2.0-flash:generateContent')
    .as('quizResponse');
})