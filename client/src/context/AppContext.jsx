import {
    createContext,
    useState,
    useCallback
} from 'react';

const initialState = {
    quizItems: [],
    correctCount: 0,
    selectedItems: {},
    categories: [],
    isError: false
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

    const setError = (isError) => {
        setState(prev => ({...prev, isError }));
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
            isError: state.isError,
            setQuizItems,
            setSelectedItems,
            setCorrectCount,
            setCategories,
            setError,
            resetQuiz
        }}>
            {children}
        </AppContext.Provider>
    )
}