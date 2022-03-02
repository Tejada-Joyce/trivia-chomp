import { useState, useRef } from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState({error: false, message: ''});

  //Handle the switch in the login and create account
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  //Validate the email function
  const validEmail = (email) => {
    return (/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}/).test(email);
  }


  //Handle the form submission with the checks in place
  const submitHandler = (event) => {
    event.preventDefault();
    
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    //Validate the email
    if (!validEmail(enteredEmail)) {
      console.log("invalid Email")
      setError({error: true, message: 'Invalid email!'})
    }

    if (isLogin) {

    } else {
      //Fecth to create a new user
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCHfXt29GTRNx06lTpcLg5ti3j8jyvIxLI',
        {
          method: 'POST',
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      ).then(res => {
        if (res.ok) {
          setIsLogin(true)
          setError({error: false, message: ''})
        } else {
          //Error Handlers
          res.json().then(data => {
            console.log(data)
            if (data.error.message === 'EMAIL_EXISTS') {
              setError({error: true, message: 'Email already registered!'})
            } else if (data.error.message === 'WEAK_PASSWORD : Password should be at least 6 characters' ||
            data.error.message === 'MISSING_PASSWORD') {
              setError({error: true, message: 'Enter at least 6 characters long password!'})
            }
          })
        }
      });
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' ref={emailInputRef} novalidate/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' ref={passwordInputRef}/>
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
          {error.error ? <span>{error.message}</span> : ''}
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
