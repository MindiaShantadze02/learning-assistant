export class Search {
    elements = {
        inputField: '[data-test="inptSearchField"] input',
        generateQuizButton: '[data-test="btnGenerateQuiz"]'
    }

    type(text) {
        cy.getElement(this.elements.inputField).type(text);
    }

    clickGenerateQuiz() {
        cy.getElement(this.elements.generateQuizButton).click();
    }
}