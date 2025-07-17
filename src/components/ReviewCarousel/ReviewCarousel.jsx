import { ReviewCard } from '../ReviewCard/ReviewCard';
import './ReviewCarousel.css'
import dataReview from '../../reviews.mock.json'

const ReviewCarousel = ({ packageId }) => {
    const filteredReviews = dataReview.filter(
        (review) => review.packageId === packageId
    );

    let averageRating = 0;
    if (filteredReviews.length > 0) {
        const totalRating = filteredReviews.reduce((sum, review) => sum + review.rating, 0);
        averageRating = (totalRating / filteredReviews.length).toFixed(1);
    }

    return (
        <div className='ReviewContainer'>
            <h1>{averageRating}</h1>
            <div className='ReviewCardContainer'>
                {filteredReviews.length > 0 ? (
                    filteredReviews.map((review) => (
                        <ReviewCard key={review.id} review={review} averageRating={averageRating} />
                    ))
                ) : (
                    <p>Nenhuma avaliação encontrada.</p>
                )}
            </div>
        </div>
    )
}

export default ReviewCarousel;