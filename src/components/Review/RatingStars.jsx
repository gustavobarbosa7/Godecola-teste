import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

export default function RatingStars({ rating }) {
    return (
        <Stack spacing={1}>
            <Rating name="half-rating-read" defaultValue={rating} precision={0.5} readOnly sx={{
                color: 'gold',
                '& .MuiRating-iconEmpty': {
                    color: 'var(--no-active-tab)'
                },
                fontSize: '1.3rem',
            }} />
        </Stack>
    );
}