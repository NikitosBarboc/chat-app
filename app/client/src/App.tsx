import AuthPage from 'pages/Auth';
import { Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
function App() {
  return (
    <div className="App">
    <Routes>
      <Route path='/login' element={<AuthPage isRegistered />} />
      <Route path='/registration' element={<AuthPage isRegistered={false} />} />
    </Routes>
    </div>
  );
}

export default App;
