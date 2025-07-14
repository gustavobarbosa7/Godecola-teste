import { useEffect, useState } from 'react';

export default function useScrollArrows(ref) {
    const [arrows, setArrows] = useState({ left: false, right: false });
    
    const checkScroll = () => {
        if (!ref.current) return;

        const { scrollLeft, scrollWidth, clientWidth } = ref.current;
        const threshold = 5;

    setArrows({
        left: scrollLeft > threshold,
        right: scrollLeft < scrollWidth - clientWidth - threshold,
    });
    };

    useEffect(() => {
        checkScroll();

        const current = ref.current;
        if (!current) return;

        current.addEventListener('scroll', checkScroll);
        window.addEventListener('resize', checkScroll);

            return () => {
                current.removeEventListener('scroll', checkScroll);
                window.removeEventListener('resize', checkScroll);
    };
    }, []);

    return {
        ...arrows,
        checkScroll
    };
}