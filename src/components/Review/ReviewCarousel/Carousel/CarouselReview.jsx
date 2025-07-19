import './CarouselReview.css';
import Box from "@mui/joy/Box";
import { forwardRef } from "react";
import { ReviewCard } from '../../ReviewCard/ReviewCard';

const CarouselReview = forwardRef(({ filteredReviews }, ref) => {
    return (
        <Box
            ref={ref}
            sx={{
                display: "flex",
                gap: 2,
                py: 2,
                overflowX: "auto",
                width: "100%",
                paddingLeft: '10px',
                scrollSnapType: "x mandatory",
                backgroundColor: 'var(--footer-bg)',
                justifyContent: filteredReviews.length === 1 ? 'center' : 'flex-start',
                "& > *": {
                    scrollSnapAlign: "center",
                    flexShrink: 0,
                },
                "::-webkit-scrollbar": { display: "none" },
            }}
        >
            {filteredReviews.map((review) => (
                <ReviewCard key={review.id} review={review} length={filteredReviews.length} />
            ))}
        </Box>)
});

export default CarouselReview;
