// const API_BASE_URL = 'http://localhost:8080/api'; 

const API_BASE_URL = import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:8080/api';


export const createBooking = async (bookingData, credentials) => {
  try {
    
    const url = `${API_BASE_URL}/bookings`; 
    const base64Credentials = btoa(`${credentials.username}:${credentials.password}`);

    const res = await fetch(url, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json', 
        
        'Authorization': `Basic ${base64Credentials}` 
      },
      
      body: JSON.stringify(bookingData),
    });

    let errorBody = null;

    if (!res.ok) {
      errorBody = await res.text(); 
      throw new Error(`Booking failed: ${res.status} ${res.statusText}${errorBody ? ' - ' + errorBody : ''}`);
    }

    
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error during booking creation:', error);
    throw error;
  }
};


