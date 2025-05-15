export class QuizItem {
    elements = {
        divQuizItem: '[data-test="divQuizItem"]',
        divQuizAnswer: '[data-test="lblAnswerOption"]'
    }

    getFirstQuizItem() {
        return cy.getElement(this.elements.divQuizItem).eq(0);
    }

    getAnswerOptionByText(answerOption) {
        return cy.contains(this.elements.divQuizAnswer, answerOption);
    }
}