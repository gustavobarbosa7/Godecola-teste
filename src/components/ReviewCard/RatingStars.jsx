import './RatingStars.css'
import { IoIosStar, IoIosStarHalf, IoIosStarOutline } from "react-icons/io";

const RatingStars = ({ rating }) => {
    const maxStars = 5;
    const decimal = rating % 1;
    let filledStars = Math.floor(rating);
    let hasHalfStar = false;

    if (decimal >= 0.3 && decimal <= 0.7) {
        hasHalfStar = true;
    } else if (decimal > 0.7) {
        filledStars += 1;
    }

    const emptyStars = maxStars - filledStars - (hasHalfStar ? 1 : 0);

    return (
        <div className="rating-stars">
            
            {[...Array(filledStars)].map((_, index) => (
                <IoIosStar key={`filled-${index}`} className="starIcon filled" />
            ))}
            
            {hasHalfStar && (
                <IoIosStarHalf key="half" className="starIcon half" />
            )}

            {[...Array(emptyStars)].map((_, index) => (
                <IoIosStarOutline key={`empty-${index}`} className="starIcon empty" />
            ))}
        </div>
    );
};

export default RatingStars;