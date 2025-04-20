const CREATE_QUIZ_CONSTRAINTS = "RESPONSE SHOULD BE AN JSON ARRAY THAT CAN BE PARSED IN JS IN FOLLOWING FORMAT " +
"[{id: 1, title: 'question title', type: 'Radio', answers[...], correctAnswer: 'correct answer'}, {id: 2, type: 'text', title: 'discuss the topic'}], " +
"AND IT SHOULD CONTAIN ONLY RAW DATA AND NO MORE COMMENTS, "  +
"RESPONSE SHOULD NOT CONTAIN CHARACTERS LIKE ` OR WORDS LIKE json. "
const CREATE_QUIZ_INSTRUCTIONS = "CREATE A QUIZ BASED ON TOPIC ";

const RATE_TEXT_ANSWERS = " RATE USERS ANSWER ON 1 OR 0 BASED ON HOW CORRECT IT IS AND RESPOND IN FOLLOWING JSON FORMAT " +
"{score: 1, review: 'Analyse users answer and give text review'}. ";

export const getPrompt = (topic) => {
    return CREATE_QUIZ_CONSTRAINTS + CREATE_QUIZ_INSTRUCTIONS + topic;
}

export const reviewAnswer = (question, answer) => {
    return "ON QUESTION "+ question + RATE_TEXT_ANSWERS + "USERS ANSWER IS " + answer;
}