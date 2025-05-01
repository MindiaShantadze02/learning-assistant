export const useQuizAPI = () => {
    const URL = "http://localhost:3001";

    const apiRequest = async (endpoint, method, payload = null) => {
        const requestObj = {
            method,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        if (payload) requestObj.body = JSON.stringify(payload);
        console.log(requestObj)

        const res = await fetch(`${URL}${endpoint}`, requestObj);

        return res;
    }

    const saveQuiz = async (quizInfo) => {
        const data = await apiRequest('/quizes', 'POST', quizInfo);
        console.log(data);
        return data;
    }

    return {
        saveQuiz
    };
}