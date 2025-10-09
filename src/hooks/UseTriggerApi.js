import { useState, useCallback } from "react";

export function useTriggerApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const trigger = useCallback(async (url, method = "POST", body = null) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: body ? JSON.stringify(body) : null,
      });
      const result = await res.json();
      setResponse(result);
      return result;
    } catch (err) {
      setError(err.message || "Unknown Error");
    } finally {
      setLoading(false);
    }
  }, []);

  return { trigger, loading, error, response };
}