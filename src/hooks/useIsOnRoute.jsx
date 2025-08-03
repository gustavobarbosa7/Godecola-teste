import { useLocation, matchPath } from "react-router-dom";

const useIsOnRoute = (pathPatterns) => {
  const { pathname } = useLocation();
  const patterns = Array.isArray(pathPatterns) ? pathPatterns : [pathPatterns];

  return patterns.some((pattern) => matchPath(pattern, pathname));
};

export default useIsOnRoute;
