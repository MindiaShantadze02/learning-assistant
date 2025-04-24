import { Button, Container } from "@mui/material"
import { Homepage } from "./pages/Homepage"
import { useState } from "react";
import {
  Routes,
  Route,
  useNavigate
} from 'react-router-dom'
import { Notes } from "./pages/Notes";
import { ContextProvider } from "./context/AppContext";

function App() {
  const navigate = useNavigate();
  const [selectedPage, setSelectedPage] = useState('quiz');
  
  const toggleSelectedPage = () => {
    if (selectedPage === 'quiz') {
      setSelectedPage('notes');
      navigate('/notes')
    } else {
      navigate('/');
      setSelectedPage('quiz');
    }
  }

  return (
    <ContextProvider>
        <Container>
          { 
            selectedPage === 'quiz' ? 
            <Button onClick={toggleSelectedPage}>Go To Notes</Button> :
            <Button onClick={toggleSelectedPage}>Go To Quiz</Button>
          }
          <Routes>
            <Route path='/'  element={<Homepage />} />
            <Route path='/notes'  element={<Notes />} />
          </Routes>
      </Container>
    </ContextProvider>
      
  )
}

export default App
