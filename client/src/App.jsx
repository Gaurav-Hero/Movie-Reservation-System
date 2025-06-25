import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/Auth/LoginPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<h1 className="text-center mt-10 text-2xl">404 Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
