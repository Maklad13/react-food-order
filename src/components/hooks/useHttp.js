import { useCallback, useEffect, useState } from "react";
async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);
  const resData = await response.json();
  if (!response.ok) {
    throw new Error(resData.message || "something went wrong");
  }
  return resData;
}
export default function useHttp(url, config, initValue) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(initValue);
  function clearData() {
    setData(initValue);
    setError(null);
    setIsLoading(false);
  }
  const sendRequests = useCallback(
    async function sendRequests(configData) {
      setIsLoading(true);
      try {
        const resData = await sendHttpRequest(url, {
          ...config,
          body: configData,
        });
        setData(resData);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    },
    [url, config]
  );
  useEffect(() => {
    if (!config) {
      sendRequests();
    }
  }, [sendRequests]);
  return { isLoading, error, data, sendRequests, clearData };
}
