import useHTTP from 'hooks/http.hooks';
import React, {  useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { loginValidation } from 'controllers/validation';
import { AuthContext } from 'context/AuthContext';

function Login() {
  const [values, setValues] = useState(() =>
    ({
      nameOrEmail: '',
      password: '',
      isPasswordVisible: false
    })
  );
  const { loading, error, request, setError } = useHTTP();
  const auth = useContext(AuthContext)

  const logInHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {

    if (!loginValidation(values, setError)) {
      const data = await request('/api/auth/login/', 'POST', values,  {
        'Content-Type': 'application/json'
      });
      if (data?.success) {
        auth.login(data?.id, data?.token);
      }
    }

    } catch(e) {  
      const error = e as Error
      console.log(error.message)
    }
  }

  function onchange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.currentTarget;

    setValues((oldValues) => ({
      ...oldValues,
      [name]: type === "checkbox" ? checked : value
    }));
  }

  return (
    <div className="auth">
      <h2 className="auth-title">Log In</h2>
      <form>
        <label htmlFor="auth-input" className="auth-input-label">
          USERNAME OR EMAIL:
          <input type="text" onChange={onchange} value={values.nameOrEmail} name="nameOrEmail" className="name auth-input" placeholder="Username or email" required />
        </label>
        <label htmlFor="auth-input" className="auth-input-label">
          PASSWORD:
          <input 
            type={values.isPasswordVisible ? "text" : "password"}
            onChange={onchange}
            value={values.password}
            name="password"
            className="password auth-input"
            placeholder="Password"
            required
          />
        </label>
        <div className="footer-form">
        <label htmlFor="" className="auth-input-label input-checkbox">
          {`show password: `}
          <input type="checkbox" onChange={onchange} name="isPasswordVisible" checked={values.isPasswordVisible} />
          </label>
          <Link to="/" className='auth-link'>Forgot Password?</Link>
        </div>
        <input type="submit" value="Login" className='auth-submit-login' onClick={logInHandler} disabled={loading} />
        <div className="error">{error}</div>
        <label htmlFor="" className='needAccount'>
            Need an account? <Link to="/registration" className='auth-link'>Register</Link>
        </label>
      </form>
    </div>
  )
}
export default Login;
