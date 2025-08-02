import { useState, useEffect } from "react";

const useShuffledArray = (arrayToShuffle) => {
  const [shuffledArray, setShuffledArray] = useState([]);

  useEffect(() => {
    if (arrayToShuffle && Array.isArray(arrayToShuffle)) {
      const shuffled = [...arrayToShuffle].sort(() => Math.random() - 0.5);
      setShuffledArray(shuffled);
    } else {
      setShuffledArray([]);
    }
  }, [arrayToShuffle]);

  return shuffledArray;
};

export default useShuffledArray;
