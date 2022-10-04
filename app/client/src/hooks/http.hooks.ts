import IAuthResponse from "IAuthResponse";
import { useCallback, useState } from "react"

const useHTTP = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const request = useCallback(
    async <T>(
      url: string,
      method = 'GET',
      body: T | null = null,
      headers: HeadersInit | undefined = {}
      ) => {
        try {

          setLoading(true);
          const resp = await fetch(url, {body: JSON.stringify(body), method, headers });
          const data = await resp.json() as IAuthResponse;
          if (!resp.ok) {
            console.error(data.message || 'Something went wrong');
          }

          setLoading(false);
          return data;
        
        } catch(e) {
          const error = e as Error;
          setError(error.message)
          setLoading(false);
          console.error(e);
        }
    }, []
  );

  const clearError = () => setError('')

  return { loading, request, error, clearError }
}

export default useHTTP;
