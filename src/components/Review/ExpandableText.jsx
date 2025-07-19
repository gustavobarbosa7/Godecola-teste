import './ExpandableText.css';
import { useRef, useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { goToReviews } from '../../routes/coordinator'

const ExpandableText = ({ text, maxLines, commentId, packageId }) => {
    const textRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        const el = textRef.current;

        const checkOverflow = () => {
            if (!el) return;
        };

        const timeoutId = setTimeout(checkOverflow, 50);
        return () => clearTimeout(timeoutId);
    }, [text, maxLines]);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: `${maxLines * 2}em`,
                overflow: 'hidden',
            }}
        >
            <Typography
                ref={textRef}
                variant="body1"
                sx={{
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: maxLines,
                    WebkitBoxOrient: 'vertical',
                    textOverflow: 'ellipsis',
                    color: 'var(--text-footer)',
                }}
            >
                {text}
            </Typography>

            <div className='ExpandableButton'
                onClick={() => goToReviews(navigate, commentId, packageId)}
            >
                Mostrar mais
            </div>
        </Box>

    );
};

export default ExpandableText;