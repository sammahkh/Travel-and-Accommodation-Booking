import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';

const useSearchParams = () => {
  const location = useLocation();

  const queryParams = useMemo(() => {
    return new URLSearchParams(location.search);
  }, [location.search]);

  return queryParams;
};

export default useSearchParams;
