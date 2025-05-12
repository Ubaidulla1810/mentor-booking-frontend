import React, { useEffect, useState } from 'react';
import { getAllMentors } from '../services/mentorApi';
import MentorCard from '../components/MentorCard';


function HomePage() {
    const [mentors, setMentors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMentors = async () => {
            try {
                setLoading(true);
                const data = await getAllMentors();
                setMentors(data);
                setError(null);
            } catch (err) {
                console.error("Failed to fetch mentors:", err);
                setError("Failed to load mentors. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchMentors();
    }, []);

    
    if (loading) {
        return <div className="text-center text-orange-500 text-xl mt-8">Loading Mentors...</div>;
    }

    if (error) {
        return <div className="container mx-auto px-4 py-8 text-center text-red-600 text-xl">Error: {error}</div>;
    }


    return (
        
        <div className="container mx-auto px-4 py-8">

            <div className="text-center my-10 p-6 bg-gray-800 rounded-lg shadow-xl">
                <h2 className="text-3xl font-bold text-orange-500 mb-4">Welcome to Mentor Booking Platform!</h2>
                <p className="text-lg text-gray-300">
                    Find and book sessions with expert mentors in various fields.
                    Accelerate your learning and achieve your goals with personalized guidance.
                </p>
                
            </div>

            
            <div className="mt-10  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Map over the mentors array to render MentorCard for each */}
                {mentors.map(mentor => (
                    <MentorCard key={mentor.id} mentor={mentor} />
                ))}
            </div>

      
            <div className="mt-10 p-6 bg-gray-800 rounded-lg shadow-xl">
                <h2 className="text-2xl font-bold text-orange-500 mb-6 text-center">Our Services</h2>
                {/* List container - use flexbox for vertical list items */}
                <div className="flex flex-col space-y-4 text-gray-300">
                   
                    <div className="flex items-center">
                        <span className="text-orange-500 mr-3 text-xl">&bull;</span> 
                        <span>Browse a diverse range of expert mentors.</span>
                    </div>
                    <div className="flex items-center">
                         <span className="text-orange-500 mr-3 text-xl">&bull;</span>
                        <span>View detailed mentor profiles and availability.</span>
                    </div>
                    <div className="flex items-center">
                         <span className="text-orange-500 mr-3 text-xl">&bull;</span>
                        <span>Easily book and manage one-on-one sessions.</span>
                    </div>
                     <div className="flex items-center">
                         <span className="text-orange-500 mr-3 text-xl">&bull;</span>
                        <span>Secure and authenticated booking process.</span>
                    </div>
                </div>
            </div>

            

        </div> 
    );
}

export default HomePage; 