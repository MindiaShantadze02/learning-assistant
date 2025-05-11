const testData = require('../fixtures/testData.json');
const { Search } = require('../pom/Search');
const { QuizItem } = require('../pom/QuizItem');

describe('Main quiz test suite', () => {
    beforeEach(() => {
        cy.visit('/');
    })

    it('Verify that user is able to generate a quiz', () => {
        const search = new Search();
        search.type(testData.validQuery);
        search.clickGenerateQuiz();

        const quizItem = new QuizItem();
        quizItem.getFirstQuizItem().should('be.visible');
    });
})