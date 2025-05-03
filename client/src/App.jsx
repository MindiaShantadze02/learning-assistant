import { Homepage } from "./pages/Homepage"
import {
  Routes,
  Route
} from 'react-router-dom'
import { ContextProvider } from "./context/AppContext";

function App() {
  return (
    <ContextProvider>
        <div>
          <Routes>
            <Route path='/'  element={<Homepage />} />
          </Routes>
      </div>
    </ContextProvider>
      
  )
}

export default App
