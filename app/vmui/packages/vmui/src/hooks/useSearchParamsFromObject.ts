import { useNavigate } from "react-router-dom";
import { useCallback } from "preact/compat";


const useSearchParamsFromObject = () => {
  const navigate = useNavigate();

  const setSearchParamsFromKeys = useCallback((objectParams: Record<string, string | number>) => {
    const hash = window.location.hash || "";
    const questionIndex = hash.indexOf("?");
    const currentSearch = questionIndex >= 0 ? hash.slice(questionIndex) : "";
    const next = new URLSearchParams(currentSearch);
    Object.entries(objectParams).forEach(([key, value]) => {
      next.set(key, `${value}`);
    });
    navigate(`?${next.toString()}`, { replace: true });
  }, [navigate]);

  return {
    setSearchParamsFromKeys
  };
};

export default useSearchParamsFromObject;
