import { useEffect, useState, useCallback, useRef } from "react";
import api from "../utils/api";

// Generic GET hook: useApi("/destinations") -> { data, loading, error, refetch }
// deps lets a component re-fetch when filters/query params change.
export default function useApi(path, { skip = false, deps = [] } = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(!skip);
  const [error, setError] = useState(null);
  const pathRef = useRef(path);
  pathRef.current = path;

  const fetchData = useCallback(async () => {
    if (skip) return;
    setLoading(true);
    setError(null);
    try {
      const result = await api.get(pathRef.current, { auth: true });
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skip, ...deps]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
