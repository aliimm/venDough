import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [first_name, SetFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    const errors = []
    if (password === repeatPassword) {
      const data = await dispatch(signUp(first_name, last_name, username, email, password));
      if (data) {
        setErrors(data)
      }
    }else{
      setErrors([...errors, 'Passwords do not match'])

    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateFirstName = (e) => {
    SetFirstName(e.target.value)
  }

  const updateLastName = (e) => {
    setLastName(e.target.value)
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/home' />;
  }

  return (
    <div className='page-container-login'>
      <div className='login-form-container'>
      <form onSubmit={onSignUp} className='all-form-login'>
      <h1 className='vendough-logo-splash'>vendough</h1>
      <p className='login-or-sign-message'>Sign Up</p>

        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>

        <div>
          <input
            className='form-box-login'
            type='text'
            name='First Name'
            onChange={updateFirstName}
            value={first_name}
            required={true}
            placeholder='First Name'
          ></input>
        </div>
        <div>
          <input
            className='form-box-login'
            type='text'
            name='Last Name'
            onChange={updateLastName}
            value={last_name}
            required={true}
            placeholder='Last Name'
          ></input>
        </div>
        <div>
          <input
            className='form-box-login'
            type='text'
            name='username'
            onChange={updateUsername}
            value={username}
            required={true}
            placeholder= 'Username'
          ></input>
        </div>
        <div>
          <input
            className='form-box-login'
            type='email'
            name='email'
            onChange={updateEmail}
            value={email}
            required={true}
            placeholder= 'Email'
          ></input>
        </div>
        <div>
          <input
            className='form-box-login'
            type='password'
            name='password'
            onChange={updatePassword}
            value={password}
            required={true}
            placeholder='Password'
          ></input>
        </div>
        <div>
          {/* <label>Repeat Password</label> */}
          <input
            className='form-box-login'
            type='password'
            name='repeat_password'
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
            placeholder='Repeat Password'
          ></input>
        </div>
        <button className='sign-in-button' type='submit'>Sign Up</button>
      </form>
      </div>
    </div>
  );
};

export default SignUpForm;
