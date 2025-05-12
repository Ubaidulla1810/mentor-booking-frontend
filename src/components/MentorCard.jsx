import { Link } from 'react-router-dom';

function MentorCard({ mentor }) {
    
    const defaultImageUrl = 'https://via.placeholder.com/300x200?text=Mentor'; 

    if (!mentor) {
        return <div className="text-center py-8 text-gray-600">Mentor data not available</div>;
    }

    return (
        <Link
            to={`/mentors/${mentor.id}`}
            className="block no-underline text-gray-800 hover:text-black transition-colors duration-200 flex-grow group" 
        > 
            <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl overflow-hidden h-full flex flex-col transform transition-transform duration-300 group-hover:scale-105">

                 <div className="relative w-full h-40 sm:h-48 bg-gray-200 overflow-hidden"> {/* Responsive height */}
                     <img
                         src={mentor.image_url || defaultImageUrl}
                         alt={`Photo of ${mentor.name}`}
                         
                         className="w-full h-full object-contain"
                     />
                 </div>

                 <div className="p-4 sm:p-6 flex-grow flex flex-col items-center text-center">
                     <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1 sm:mb-2">{mentor.name}</h3>
                     <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">{mentor.expertise}</p>
                      <p className="text-md font-bold text-orange-600 mt-auto">{`₹${mentor.price} / hour`}</p>
            
                 </div>
             </div>
         </Link> 
     );
 }

 export default MentorCard;