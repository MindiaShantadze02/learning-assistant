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

        const res = await fetch(`${URL}${endpoint}`, requestObj);

        return res;
    }

    const saveQuiz = async (quizInfo) => {
        const data = await apiRequest('/quizes', 'POST', quizInfo);
        return data;
    }

    const fetchQuizOption = async (category) => {
        const res = await apiRequest(`/categories/${category}`);
        const data = await res.json();
        return data;
    };

    const fetchQuizItemsByTopic = async (category, topic) => {
        const res = await apiRequest(`/categories/${category}/${topic}`);
        const data = await res.json();
        return data;
    };

    return {
        saveQuiz,
        fetchQuizOption,
        fetchQuizItemsByTopic
    };
}