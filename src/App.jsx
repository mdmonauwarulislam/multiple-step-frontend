import RegisterForm from "./pages/RegisterForm"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';
import UserDashboard from "./pages/UserDashboard";
import Homepage from "./pages/Homepage";

function App() {

  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/api/register" element={<RegisterForm/>} />
        <Route path="/api/login" element={<Login />} />
        <Route path="/api/user/:id" element={<UserDashboard />} />
      </Routes>
    </Router>
  )
}

export default App
