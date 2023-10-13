import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './components/css/common.css';
import './App.css';
import { Link } from 'react-router-dom';
import Homepage from "./components/pages/Homepage";
import Header from "./components/layouts/Header";
import SignUp from "./components/pages/SignUp";
import Login from "./components/pages/Login";

function App() {
  return (
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
  );
}

export default App;
