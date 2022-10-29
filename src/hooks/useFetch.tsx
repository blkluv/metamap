import { useState, useEffect } from "react";
import { Event } from "../utils/interfaces";
import axios from "axios";

const useFetch = (url: string) => {
  const [data, setData] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean | unknown | string>(false);

  useEffect(() => {
    let isMounted = true;
    const source = axios.CancelToken.source();

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(url, { cancelToken: source.token });
        if (isMounted) {
          setData(res.data);
          setError(false);
        }
      } catch (error: unknown) {
        if (isMounted) {
          if (error instanceof Error) {
            setError(error.message);
            setData([]);
          } else if (typeof error === "string") {
            setError(error);
            setData([]);
          }
        }
      } finally {
        isMounted && setIsLoading(false);
      }
    };
    fetchData();

    const cleanUp = () => {
      isMounted = false;
      source.cancel();
    };

    return cleanUp;
  }, [url]);

  return { data, isLoading, error };
};

export default useFetch;
