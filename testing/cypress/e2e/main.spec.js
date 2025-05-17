/// <reference types="cypress">
const testData = require('../fixtures/testData.json');
const { Search } = require('../pom/Search');
const { QuizItem } = require('../pom/QuizItem');
const { formatJSONResponse } = require('../utils/utils');
const { EN_localhost } = require('../environments/environments.json');


describe('Main quiz test suite', () => {
    beforeEach(() => {
        cy.visit(EN_localhost);
    })

    it('Verify that user is able to generate a quiz', () => {
        const search = new Search();
        search.type(testData.validQuery);
        search.clickGenerateQuiz();

        const quizItem = new QuizItem();
        quizItem.getFirstQuizItem().should('be.visible');
    });

    it('Verify that correct answer is marked as green in cypress', () => {
        const search = new Search();
        search.type(testData.validQuery);
        cy.getAIQuizResponse();
        search.clickGenerateQuiz();
        cy.wait('@quizResponse').then((quizResponse) => {
            const { text: quizStr } = quizResponse.response.body.candidates[0].content.parts[0];
            const quizItems = formatJSONResponse(quizStr);
            const correctAnswer = quizItems[0].correctAnswer;
            const quizItem = new QuizItem();
            quizItem.getAnswerOptionByText(correctAnswer)
                .click()
                .parent()
                .parent()
                .should('have.css', 'background-color')
                .and('match', /rgb\(29,\s205,\s159\)/);
        })
    })
})