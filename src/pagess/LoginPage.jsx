import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate,Link } from 'react-router-dom';

function LoginPage() {
    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    
    if (isAuthenticated) {
        navigate('/');
        return null;
    }

    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });

    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials({
            ...credentials,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);
        setLoading(true);

        if (!credentials.username || !credentials.password) {
            setMessage('Please enter username and password.');
            setLoading(false);
            return;
        }

        try {
            await login(credentials.username, credentials.password);
            console.log('Login successful, navigating to home.');
            navigate('/'); // Redirect on success
        } catch (error) {
            setMessage(`Login failed: ${error.message || 'Invalid credentials'}`);
            console.error('Login failed:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        
        <div className="flex justify-center items-center min-h-screen -mt-16"> 
          
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
                

                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
                

                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                   
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username:</label>
                      
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={credentials.username}
                            onChange={handleInputChange}
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
                            name="password"
                            value={credentials.password}
                            onChange={handleInputChange}
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
                        {loading ? 'Logging In...' : 'Login'}
                    </button>
                </form>

              
                {message && (
                    <p className="text-red-600 text-center mt-4 text-sm">{message}</p>
                )}

               
                 <p className="text-center text-gray-600 text-sm mt-4">
                    Don't have an account?
                    <Link to="/register" className="text-orange-500 hover:text-orange-600 font-medium ml-1">Register here.</Link>
        
                 </p>

            </div>
        </div>
    );
}

export default LoginPage;