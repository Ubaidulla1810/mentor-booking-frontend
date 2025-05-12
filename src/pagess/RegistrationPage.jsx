import React, { useState } from 'react'; 
import { registerUser } from '../services/userApi'; 
import { useNavigate ,Link } from 'react-router-dom';

function RegistrationPage() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => { 
    e.preventDefault(); 
    setMessage(null);
    setLoading(true);

    try {
      const userData = { username, password };
      const response = await registerUser(userData); 
      setMessage('Registration successful!');
      console.log('Registration successful:', response);
      console.log("RegistrationPage: Redirecting to login page."); 
      navigate('/login'); 
      setUsername('');
      setPassword('');

    } catch (error) {
      const errorMessage = error.message || 'An error occurred during registration.';
      setMessage(`Registration failed: ${errorMessage}`);
      console.error('Registration failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen -mt-16"> 
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Register New Account</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username:</label>     
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={loading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-gray-900"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-gray-900"
            
            />
          </div>
       
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
           
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        {message && (
          <p className={`text-center mt-4 text-sm ${message.includes('successful') ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}

        <p className="text-center text-gray-600 text-sm mt-4">
          Already have an account?
          <Link to="/login" className="text-orange-500 hover:text-orange-600 font-medium ml-1">Login here.</Link>
          
        </p>

      </div> 
    </div> 
);
}

export default RegistrationPage;