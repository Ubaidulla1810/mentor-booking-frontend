import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pagess/HomePage';
import MentorDetailsPage from './pagess/MentorDetailsPage';
import RegistrationPage from './pagess/RegistrationPage';
import LoginPage from './pagess/LoginPage';
import Navbar from './components/Navbar';


function App() {
  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/mentors/:id' element={<MentorDetailsPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <div className="mt-12 sm:mt-16 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Your MentorConnent. All rights reserved.
      </div>
    </div>
  );
}

export default App;