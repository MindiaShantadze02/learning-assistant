const CREATE_QUIZ_CONSTRAINTS = "RESPONSE SHOULD BE ONLY AN JSON ARRAY THAT CAN BE PARSED IN JS IN FOLLOWING FORMAT " +
"[{id: uuid, title: 'question title', type: 'Radio', answers[...], correctAnswer: 'correct answer'}, {id: uuid, type: 'text', title: 'discuss the topic', correctAnswer: 'correct answer'}], " +
"AND IT SHOULD CONTAIN ONLY RAW DATA AND NO MORE COMMENTS, IN CASE OF PROGRAMMING TEXT TYPE CAN ALSO CONTAIN CODING EXERCISES NOT SPECIFIC TO ANY LANGUAGE"  +
"RESPONSE SHOULD NOT CONTAIN CHARACTERS LIKE ` OR WORDS LIKE json. "
const CREATE_QUIZ_INSTRUCTIONS = "CREATE A COMPREHENSIVE QUIZ BASED ON TOPIC ";

const RATE_TEXT_ANSWERS = " RATE USERS ANSWER ON 1 if complete correct answer "+ 
"OR 0.5 on partial correct answer OR 0 on incorrect answer BASED ON HOW CORRECT IT IS AND RESPOND IN FOLLOWING JSON FORMAT " +
"{score: 1, review: 'Analyse users answer and give text review'} (ESCAPE SPECIAL CHARACTERS)";

export const getPrompt = (topic) => {
    return CREATE_QUIZ_CONSTRAINTS + CREATE_QUIZ_INSTRUCTIONS + topic;
}

export const reviewAnswer = (question, answer) => {
    return "ON QUESTION "+ question + RATE_TEXT_ANSWERS + "USERS ANSWER IS " + answer;
}