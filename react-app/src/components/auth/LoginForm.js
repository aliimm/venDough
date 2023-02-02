import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './loginform.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const demoLogin = () => {
    setEmail('demo@aa.io')
    setPassword('password')
    return dispatch(login(email, password));
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/home' />;
  }

  return (
    <div className='page-container-login'>
    <div className='login-form-container'>
      <form onSubmit={onLogin} className='all-form-login'>
      <h1 className='vendough-logo-splash'>vendough</h1>
      <p className='login-or-sign-message'>Log in or sign up</p>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div>
          {/* <label htmlFor='email'>Email</label> */}
          <input
            className='form-box-login'
            name='email'
            type='text'
            placeholder='Email'
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div>
          {/* <label htmlFor='password'>Password</label> */}
          <input
            className='form-box-login'
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={updatePassword}
          />
        </div>
          <button className='sign-in-button' type='submit'>Sign in</button>
          <button  className='demo-user-login' onClick={demoLogin} type='submit'>Demo User</button>
          <NavLink className='sign-up-button-on-sign-in' to='/sign-up'>Sign Up</NavLink>
      </form>
    </div>
    </div>
  );
};

export default LoginForm;
