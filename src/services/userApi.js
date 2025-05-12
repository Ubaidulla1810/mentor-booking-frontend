// const API_BASE_URL = 'http://localhost:8080/api';

const API_BASE_URL = import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:8080/api';


export const registerUser = async (userData) => {
  try {
    const url = `${API_BASE_URL}/users/register`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    let errorBody = null;

    if (!res.ok) {
      errorBody = await res.text();
      throw new Error(`Registration failed: ${res.status} ${res.statusText}${errorBody ? ' - ' + errorBody : ''}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error during user registration:', error);
    throw error;
  }
};


