import './AllReviewsPage.css'
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import reviewsData from '../../reviews.mock.json';
import { ReviewCardToPage } from '../../components/Review/ReviewCardToPage/ReviewCardToPage';

const AllReviewsPage = () => {
    const location = useLocation();
    const reviewRefs = useRef({});
    const [filteredReviews, setFilteredReviews] = useState([]);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const packageId = queryParams.get('packageId');
        const highlightId = queryParams.get('highlightId');

        let reviewsToDisplay = reviewsData;

        if (packageId) {
            reviewsToDisplay = reviewsData.filter(
                review => String(review.packageId) === packageId
            );
        }
        setFilteredReviews(reviewsToDisplay);

        const timeout = setTimeout(() => {

            if (highlightId && reviewRefs.current[highlightId]) {
                reviewRefs.current[highlightId].scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        }, 100);

        return () => clearTimeout(timeout);

    }, [location.search]);

    const currentQueryParams = new URLSearchParams(location.search);


    return (
        <div className='AllReviewsContainer'>
            <Box sx={{ p: 3, maxWidth: '800px', margin: 'auto' }}>
                <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'var(--primary-text-color)', marginBottom: '20px' }}>
                    Todas as Avaliações
                </Typography>
                {filteredReviews.length > 0 ? (
                    filteredReviews.map(review => (
                        <Box
                            key={review.id}

                            ref={el => {
                                if (el) {
                                    reviewRefs.current[review.id] = el;
                                } else {
                                    delete reviewRefs.current[review.id];
                                }
                            }}
                            sx={{
                                border: (String(currentQueryParams.get('highlightId')) === String(review.id)) ? '2px solid var(--orange-avanade)' : '1px solid var(--icons-login-hover)',
                                borderRadius: '8px',
                                marginBottom: '15px',
                                p: 1,
                                backgroundColor: 'var(--footer-bg)'
                            }}
                        >
                            <ReviewCardToPage review={review} />
                        </Box>
                    ))
                ) : (
                    <Typography variant="body1" sx={{ textAlign: 'center', mt: 4, color: 'var(--primary-text-color)' }}>
                        Nenhuma avaliação encontrada para este pacote.
                    </Typography>
                )}
            </Box>
        </div>
    );
};

export default AllReviewsPage;