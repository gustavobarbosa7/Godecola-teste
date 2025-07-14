import { useState, useEffect } from 'react';

const useShuffledArray = (arrayToShuffle) => {

    const [shuffledArray, setShuffledArray] = useState([]);

    useEffect(() => {
        if (arrayToShuffle) {
            const shuffled = [...arrayToShuffle].sort(() => Math.random() - 0.5);
            setShuffledArray(shuffled);
        }
    }, []);

    return shuffledArray;
};

export default useShuffledArray;