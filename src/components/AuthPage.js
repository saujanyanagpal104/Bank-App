import React, { useState, useRef } from 'react';

const AuthPage = ({ setUsername, authError, setSignup, handleAuth }) => {
  const [checkUsername, setCheckUsername] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [password, setPassword] = useState(false);

  const passwordRef = useRef();

  const handleUsername = (e) => {
    e.preventDefault();
    setCheckUsername(e.target.value);
  };

  const handlePassword = (e) => {
    e.preventDefault();
    setPassword(passwordRef.current.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!checkUsername || !password) {
      setIsValid(true);
    } else {
      setIsValid(false);
      const trimUsername = checkUsername.trim();
      handleAuth(trimUsername, password);
      setUsername(trimUsername);
    }
  };

  const handleRegister = () => {
    setSignup(true);
  };

  return (
    <div className='auth-container'>
      <form>
        <input
          type='text'
          placeholder='Username'
          onChange={handleUsername}
          name='username'
        />
        <input
          type='password'
          placeholder='Password'
          ref={passwordRef}
          onChange={handlePassword}
          name='password'
        />
        <button className='login-signup-button button' onClick={handleSubmit}>
          Login/Signup
        </button>
        {isValid && (
          <span className='error alert alert-danger' role='alert'>
            Cannot leave fields Empty
          </span>
        )}
        {authError && !isValid ? (
          <span className='error alert alert-danger' role='alert'>
            Invalid username or password
          </span>
        ) : null}
        {authError && !isValid ? (
          <span onClick={handleRegister} className='register'>
            <span className='new-register'>If New, Register</span>
            <span className='register-button button'>Register</span>
          </span>
        ) : null}
      </form>
    </div>
  );
};

export default AuthPage;
