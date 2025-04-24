import {
    createContext,
    useState
} from 'react';

const initialState = {
    quizItems: [],
    notes: [],
    correctCount: 0,
    selectedItems: {}
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

    const increasteCorrectCount = () => 
        setState(prev => ({ ...prev, correctCount: prev.correctCount + 1 }));
    
    const decreaseCorrectCount = () => 
        setState(prev => ({ ...prev, correctCount: prev.correctCount - 1 }));

    const setItemSelected = (quizItem) => {
        setState(prev => {
            const newSelectedItems = { ...prev.selectedItems, [quizItem]: true };
            return {
                ...prev,
                selectedItems: newSelectedItems
            };
        });
    };

    return (
        <AppContext.Provider value={{ 
            notes: state.notes,
            quizItems: state.quizItems,
            correctCount: state.correctCount,
            selectedItems: state.selectedItems,
            setQuizItems,
            setItemSelected,
            setNotes,
            increasteCorrectCount,
            decreaseCorrectCount
        }}>
            {children}
        </AppContext.Provider>
    )
}