import React from "react";
import { useState, useCallback } from "react";

import AuthContext from "../context/AuthContext";

const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const auth = React.useContext(AuthContext);

  const request = useCallback(async (url, method = "GET", body = null, headers = {}) => {
    setLoading(true)
    try {
      if (body) {
        body = JSON.stringify(body);
        headers["Content-Type"] = "application/json";
      }

      const response = await fetch(`https://thoughts-storage-backend.herokuapp.com${url}`, { method, body, headers });
      const data = await response.json();

      setLoading(false);

      if (!response.ok) {
        setError(data.message || "Something went wrong");
        if (response.status === 401) {
          window.location.replace(`${window.location.origin}/SignIn`);
          auth.logout();
        }
      } else {
        return data;
      }
    } catch (e) {
      setLoading(false);
      setError(e.message);
      throw e;
    }
  }, [auth]);

  const clearError = () => setError(null);

  return { loading, request, error, clearError };
}

export default useHttp;
