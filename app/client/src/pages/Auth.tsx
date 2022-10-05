import React from 'react';
import Login from 'components/login';
import './auth.css';
import Footer from 'components/footer';

import Register from 'components/Register';

interface IAuthPageProps {
  isRegistered: boolean,
}

export default function AuthPage(props: IAuthPageProps) {
  
  const { isRegistered } = props;
  const titleText = isRegistered ? "Join Donjo" : "welcome back to Donjo"
  return (
    
    <div className='auth-page'>
      <h1 className='title main-title'>{titleText}</h1>
      <main className="main">
        {isRegistered ? <Login /> : <Register />}
      </main>
      <Footer />
    </div>
  );
}
