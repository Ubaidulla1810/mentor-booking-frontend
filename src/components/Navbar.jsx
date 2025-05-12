import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
    const { isAuthenticated, logout } = useAuth();

    return (
        <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
            <div className="text-lg font-bold text-orange-500">MentorConnect</div>
            <div>
                <Link to="/" className="text-gray-300 hover:text-white mr-4">Home</Link>
                {isAuthenticated ? (
                    <> 
                        <button
                            onClick={logout}
                            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/register" className="text-gray-300 hover:text-white mr-4">Register</Link>
                        <Link to="/login" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded">Login</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;