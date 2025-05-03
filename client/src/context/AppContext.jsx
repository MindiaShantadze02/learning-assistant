import {
    createContext,
    useState,
    useCallback
} from 'react';

const initialState = {
    quizItems: [],
    correctCount: 0,
    selectedItems: {},
    categories: []
}

export const AppContext = createContext(initialState);

export const ContextProvider = ({ children }) => {
    const [state, setState] = useState(initialState);

    const setQuizItems = (newQuizItems) => {
        setState(prev => {
            return {
                ...prev,
                quizItems: newQuizItems
            }
        });
    }

    const setCorrectCount = (correctCount) => setState(prev => ({ ...prev, correctCount }));

    const setSelectedItems = (newSelectedItems) => {
        setState(prev => {
            return {
                ...prev,
                selectedItems: newSelectedItems
            };
        });
    };

    const setCategories = (newCategories) => {
        setState(prev => {
            return {
                ...prev,
                categories: newCategories
            }
        })
    }

    const resetQuiz = useCallback(() => {
        setSelectedItems({});
        setCorrectCount(0);
      }, []);

    return (
        <AppContext.Provider value={{
            quizItems: state.quizItems,
            correctCount: state.correctCount,
            selectedItems: state.selectedItems,
            categories: state.categories,
            setQuizItems,
            setSelectedItems,
            setCorrectCount,
            setCategories,
            resetQuiz
        }}>
            {children}
        </AppContext.Provider>
    )
}