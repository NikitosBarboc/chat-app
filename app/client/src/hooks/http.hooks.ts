import IAuthResponse from "IAuthResponse";
import { useCallback, useState } from "react"

const useHTTP = () => {
  const [loading, setLoading] = useState(() => false);
  const [error, setError] = useState(() => '');
  const request = useCallback(
    async <T>(
      url: string,
      method = 'GET',
      body: T | null = null,
      headers: HeadersInit | undefined = {}
      ) => {
        try {
          setError('');
          setLoading(true);
          const resp = await fetch(url, {body: JSON.stringify(body), method, headers });
          const data = await resp.json() as IAuthResponse;
          if (!resp.ok) {
            setError(data.message)
          }

          setLoading(false);
          return data;
        
        } catch(e) {
          setLoading(false);
        }
    }, []
  );

  return { loading, request, error, setError }
}

export default useHTTP;
