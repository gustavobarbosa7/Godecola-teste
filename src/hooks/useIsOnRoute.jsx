import { useMatch } from 'react-router-dom';

const useIsOnRoute = (pathPattern) => {
    const match = useMatch(pathPattern);
    return !!match;
};

export default useIsOnRoute;