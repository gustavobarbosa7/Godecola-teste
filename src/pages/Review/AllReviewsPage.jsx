import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import reviewsData from '../../reviews.mock.json';
import { ReviewCard } from '../../components/ReviewCard/ReviewCard';

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
        <Box sx={{ p: 3, maxWidth: '800px', margin: 'auto' }}>
            <Typography variant="h4" component="h1" gutterBottom>
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

                            border: (String(currentQueryParams.get('highlightId')) === String(review.id)) ? '2px solid #1976d2' : '1px solid #e0e0e0',
                            borderRadius: '8px',
                            marginBottom: '15px',
                            p: 1
                        }}
                    >
                        <ReviewCard review={review} />
                    </Box>
                ))
            ) : (
                <Typography variant="body1" sx={{ textAlign: 'center', mt: 4 }}>
                    Nenhuma avaliação encontrada para este pacote.
                </Typography>
            )}
        </Box>
    );
};

export default AllReviewsPage;