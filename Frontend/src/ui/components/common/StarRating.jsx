import { FaStar } from "react-icons/fa";
import { useState } from "react";

export const StarRating = ({ onRatingChange }) => {
    const [hover, setHover] = useState(null);
    const [rating, setRating] = useState(null);

    return (
        <div className="flex items-center space-x-1">
            {[...Array(5)].map((star, index) => {
                const currentRating = index + 1;
                return (
                    <label key={index}>
                        <input
                            hidden
                            type="radio"
                            name="rating"
                            value={currentRating}
                            onClick={() => {
                                onRatingChange(currentRating);
                                setRating(currentRating);
                            }}
                        />
                        <FaStar
                            className={`text-xl transition duration-200 ease-in-out ${
                                (hover || rating) >= currentRating ? 'text-yellow-500' : 'text-gray-300'
                            }`}
                            size={20}
                            onMouseEnter={() => setHover(currentRating)}
                            onMouseLeave={() => setHover(null)}
                        />
                    </label>
                );
            })}
        </div>
    )
}
