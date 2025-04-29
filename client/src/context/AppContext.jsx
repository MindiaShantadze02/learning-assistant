import {
    createContext,
    useState
} from 'react';

const initialState = {
    quizItems: [],
    notes: [],
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

    const setNotes = (newNotes) => {
        setState(prev => {
            return {
                ...prev,
                notes: newNotes
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

    return (
        <AppContext.Provider value={{ 
            notes: state.notes,
            quizItems: state.quizItems,
            correctCount: state.correctCount,
            selectedItems: state.selectedItems,
            categories: state.categories,
            setQuizItems,
            setSelectedItems,
            setNotes,
            setCorrectCount,
            setCategories
        }}>
            {children}
        </AppContext.Provider>
    )
}