import AuthPage from 'pages/Auth';
import { Routes, Route } from 'react-router-dom';
import React from 'react';
import { useAuth } from 'hooks/auth.hook';
import { AuthContext } from 'context/AuthContext';

function App() {

  const{ login, logout, jwtToken, userId } = useAuth()
  const isAuthenticated = !!jwtToken
  return (
    <div className="App">
    <AuthContext.Provider value={{
      login, logout, jwtToken, userId, isAuthenticated
    }}>
      <Routes>
        <Route path='/login' element={<AuthPage isRegistered />} />
        <Route path='/registration' element={<AuthPage isRegistered={false} />} />
      </Routes>
    </AuthContext.Provider>

    </div>
  );
}

export default App;
