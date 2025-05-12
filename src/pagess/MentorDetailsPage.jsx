// In src/pagess/MentorDetailsPage.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // To get the mentor ID from the URL
import { getMentorById, getMentorAvailabilityById } from '../services/mentorApi'; // Assuming these functions exist
import { createBooking } from '../services/bookingApi'; // Assuming this function exists
import { useAuth } from '../context/AuthContext'; // To get logged-in user credentials

// You might need date formatting libraries if availability dates/times need complex formatting
// import moment from 'moment'; // Example

function MentorDetailsPage() {
    const { id } = useParams(); // Get the mentor ID from the URL (e.g., /mentors/1)
    const { isAuthenticated, userId, username, password } = useAuth(); // Get auth state and credentials

    const [mentor, setMentor] = useState(null);
    const [availability, setAvailability] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState(null); // State to hold the selected availability slot
    const [bookingMessage, setBookingMessage] = useState(null); // State for booking feedback

    // Fallback image if mentor image_url is missing
    const defaultMentorImageUrl = 'https://via.placeholder.com/200?text=Mentor';


    // Fetch mentor details and availability when the component mounts or ID changes
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null); // Clear previous errors

                // Fetch mentor details
                const mentorData = await getMentorById(id);
                console.log("Mentor data fetched:", mentorData); // Log mentor data
                setMentor(mentorData);

                // Fetch mentor availability
                const availabilityData = await getMentorAvailabilityById(id);
                console.log("Availability data fetched:", availabilityData); // Log fetched availability data
                setAvailability(availabilityData); // Update availability state

            } catch (err) {
                console.error("Failed to fetch mentor details or availability:", err);
                setError(`Failed to load mentor details. ${err.message || 'Please try again later.'}`);
            } finally {
                setLoading(false); // Turn off loading
            }
        };

        fetchData();
    }, [id]); // Re-run effect if the mentor ID from the URL changes

    // Handle selecting an availability slot
    const handleSelectSlot = (slot) => {
        setSelectedSlot(slot);
        setBookingMessage(null); // Clear booking message when selecting a new slot
    };

    // Handle booking the selected slot
    const handleBookSlot = async () => {
        if (!selectedSlot) {
            setBookingMessage('Please select an availability slot first.');
            return;
        }

        if (!isAuthenticated) {
            setBookingMessage('You must be logged in to book a session.');
             // Optional: Redirect to login page: navigate('/login');
            return;
        }

         // --- Prepare Credentials for Backend Basic Auth ---
         // This assumes your backend expects Basic Auth with username and password
         // If using the insecure password storage, use password from context.
         // If using tokens, you'd retrieve and send the token instead.
         const userCredentials = { username: username, password: password }; // Use password from context (insecure fix)


        // Prepare booking data
        // We confirmed the 'date' field is needed by the backend Booking entity.
        // The console log shows selectedSlot has a 'date' property.
        const bookingData = {
            mentorId: mentor.id,
            userId: userId, // Ensure userId is available in your AuthContext and populated on login
            date: selectedSlot.date, // <-- Use the date directly from the selected slot object
            startTime: selectedSlot.startTime, // Use the selected slot's start time
            endTime: selectedSlot.endTime // Use the selected slot's end time
            // Add any other necessary booking details
        };

        setBookingMessage('Booking session...'); // Set booking loading message

        try {
            // Call the createBooking API function
            const newBooking = await createBooking(bookingData, userCredentials);

            setBookingMessage(`Session booked successfully! Booking ID: ${newBooking.id}`);
            console.log('New booking created:', newBooking);

            // Optional: Refresh availability or remove the booked slot from the list
            // You would need to re-fetch availability or update the state here
            // For simplicity now, we just show success message.

        } catch (err) {
             console.error('Booking failed:', err);
             // Check for specific error messages from backend, e.g., 409 conflict for already booked
             // err.response.data might contain more details if backend sends a response body
             const errorMessage = err.message || 'An unexpected error occurred.';
              setBookingMessage(`Booking failed: ${errorMessage}`);

        }
    };


    // Display loading or error messages while fetching initial data
    if (loading) {
        return <div className="text-center text-orange-500 text-xl mt-8">Loading Mentor Details...</div>;
    }

    if (error) {
        return <div className="container mx-auto px-4 py-8 text-center text-red-600 text-xl">Error: {error}</div>;
    }

    // If mentor data is not found or not loaded after loading finishes
    if (!mentor) {
         return <div className="container mx-auto px-4 py-8 text-center text-gray-600 text-xl">Mentor not found.</div>;
    }


    // Main return block for the Mentor Details page layout
    return (
        // Main container with padding and background adjustments
        <div className="container mx-auto px-4 py-8 text-gray-200"> {/* text-gray-200 for default text color */}

            {/* Mentor Profile Section */}
            <div className="bg-gray-800 rounded-lg shadow-xl p-8 flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-10">
               
                 <div className="flex-shrink-0 w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-orange-500">
                     
                    <img
                        src={mentor.image_url || defaultMentorImageUrl}
                        alt={`Photo of ${mentor.name}`}
                        className="w-full h-full object-cover"
                    />
                   
                 </div>

                <div className="flex-grow text-center md:text-left"> 
                    <h2 className="text-3xl font-bold text-orange-500 mb-2">{mentor.name}</h2>
                    <p className="text-xl text-gray-300 mb-4">{mentor.expertise}</p>
                    <p className="text-gray-400 leading-relaxed mb-4">{mentor.description}</p>
                    <p className="text-2xl font-bold text-orange-600">₹{mentor.price} / hour</p>
                
                </div>

            </div> 


            <div className="mt-10 bg-gray-800 rounded-lg shadow-xl p-8 flex flex-col items-center"> 

            
                <h3 className="text-2xl font-bold text-orange-500 mb-6 text-center mx-auto">Available Sessions</h3>

                <p className="text-center text-gray-400 text-sm mb-4 mx-auto">
                    All times are shown in 24-hour format (HH:mm).
                </p>


                {availability.length > 0 ? (
                
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto max-w-full md:max-w-lg"> 
                        {availability.map(slot => (
                            <div
                                key={slot.id} 
                                className={`p-4 rounded-md cursor-pointer transition-all duration-200 text-center
                                           ${selectedSlot && selectedSlot.id === slot.id
                                                ? 'bg-orange-500 text-white shadow-md scale-105' 
                                                : 'bg-gray-700 hover:bg-gray-600 text-gray-200' 
                                            }`}
                                onClick={() => handleSelectSlot(slot)} 
                            >
                          
                                <p className="font-semibold mx-auto text-center">
                                     Date: {slot.date} <br/> Time: {slot.startTime} to {slot.endTime}
                                </p>
                
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-400 mx-auto">No availability found for this mentor.</p>
                )}

                <div className="mt-8 text-center mx-auto">
        
                      <button
                          onClick={handleBookSlot}
                          disabled={!selectedSlot || !isAuthenticated || bookingMessage === 'Booking session...'}
                          className={`bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-md text-lg transition duration-300
                                     ${(!selectedSlot || !isAuthenticated || bookingMessage === 'Booking session...') ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                          {bookingMessage === 'Booking session...' ? 'Booking...' : 'Book Selected Session'}
                      </button>

                    
                      {bookingMessage && (
                          <p className={`mt-4 text-center font-semibold ${bookingMessage.includes('successfully') ? 'text-green-500' : (bookingMessage.includes('Error') || bookingMessage.includes('failed') ? 'text-red-500' : 'text-yellow-500')}`}>
                              {bookingMessage}
                          </p>
                      )}

           
                      {!isAuthenticated && (
                           <p className="mt-4 text-center text-yellow-500 text-sm">Please log in to book a session.</p>
                       )}
                 </div> 

            </div>

            

        </div> 
    );
}

export default MentorDetailsPage;