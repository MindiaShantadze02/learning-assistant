export class QuizItem {
    elements = {
        divQuizItem: '[data-test="divQuizItem"]'
    }

    getFirstQuizItem() {
        return cy.getElement(this.elements.divQuizItem).eq(0);
    }
}