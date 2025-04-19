const CONSTRAINTS = "RESPONSE SHOULD BE AN JSON ARRAY THAT CAN BE PARSED IN JS IN FOLLOWING FORMAT [{title: 'question title', type: 'Radio', answers[...]}, {type: 'text', 'discuss the topic'}], " +
"AND IT SHOULD CONTAIN ONLY RAW DATA AND NO MORE COMMENTS, "  +
"RESPONSE SHOULD NOT CONTAIN CHARACTERS LIKE ` OR WORDS LIKE json. "
const INSTRUCTIONS = "CREATE A QUIZ BASED ON TOPIC ";

export const getPrompt = (topic) => {
    return CONSTRAINTS + INSTRUCTIONS + topic;
}