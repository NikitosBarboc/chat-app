import { useState, useCallback, useEffect } from "react";

const storageName = 'userData';

interface IUserInfo {
  userId: string,
  jwtToken: string,
}

export const useAuth = () => {
  const [userId, setUserId] = useState('');
  const [jwtToken, setJwtToken] = useState('')

  const login = useCallback((userId: string, jwtToken: string) => {
    setUserId(userId);
    setJwtToken(jwtToken);
    localStorage.setItem(storageName, JSON.stringify({
      userId, jwtToken
    }));
  }, []);

  const logout = useCallback(() => {
    setUserId('');
    setJwtToken('');
    localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    const data = localStorage.getItem(storageName);
    const parsedData = JSON.parse(data as string) as IUserInfo

    if (parsedData?.jwtToken) {
      login(parsedData.jwtToken, parsedData.userId)
    }
  }, [login])

  return { login, logout, jwtToken, userId }
}