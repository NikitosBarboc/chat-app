import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import useHTTP from 'hooks/http.hooks';
import { registerValidation } from 'controllers/validation';
import { AuthContext } from 'context/AuthContext';
function Register() {

  const [values, setValues] = useState(() =>
    ({
      name: '',
      email: '',
      password: '',
      isPasswordVisible: false
    })
  );
  
  const { loading, error, request, setError } = useHTTP();
  const auth = useContext(AuthContext);

  const registerHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!registerValidation(values, setError)) {
        registerValidation(values, setError);
        const data = await request('/api/auth/register/', 'POST', values,  {
            'Content-Type': 'application/json'
        });
        if (data?.success) {
          auth.login(data.id, data.token);
        }
        

      }

    } catch(e) {  
      const error = e as Error
      console.log(error.message)
    }
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.currentTarget;

    setValues((oldValues) => ({
      ...oldValues,
      [name]: type === "checkbox" ? checked : value
    }));
  }

  return (
    <div className="auth">
      <h2 className="auth-title">Sign In</h2>
      <form className='auth-form'>
        <label htmlFor="auth-input" className="auth-input-label">
          USERNAME:
          <input type="text" name="name" className="name auth-input" onChange={onChange} value={values.name} placeholder="Username" required />
        </label>
        <label htmlFor="auth-input" className="auth-input-label">
          EMAIL:
          <input type="text" name="email" className="email auth-input" onChange={onChange} value={values.email} placeholder="email" required />
        </label>
        <label htmlFor="auth-input" className="auth-input-label">
          PASSWORD:
          <input 
            type={values.isPasswordVisible ? "text" : "password"}
            onChange={onChange}
            value={values.password}
            name="password"
            className="password auth-input"
            placeholder="Password"
            required
          />
        </label>
        <label htmlFor="" className="auth-input-label input-checkbox">
            {`show password: `}
            <input type="checkbox" onChange={onChange} name="isPasswordVisible" checked={values.isPasswordVisible} />
        </label>
        <input type="submit" onClick={registerHandler} disabled={loading} value="Register" className='auth-submit-register' />
        <div className="error">{error}</div>
        <Link className="auth-link haveAccount" to="/login">
          Already have an account?
        </Link>
      </form>
    </div>
  )
}
export default Register;