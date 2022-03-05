import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-contex";
import { auth, provider } from "../../config/firebase";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const navigate = useNavigate();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState({ error: false, message: "" });

  //Handle the switch in the login and create account
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
    setError({ error: false, message: "" });
  };

  //Validate the email function
  const validEmail = (email) => {
    return /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}/.test(email);
  };

  //Login with Google buttons
  const handleLoginGoogle = (event) => {
    event.preventDefault();
    auth
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Handle the form submission with the checks in place
  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    //Validate the email
    if (!validEmail(enteredEmail)) {
      setError({ error: true, message: "Invalid email!" });
    } else {
      let url;
      //Login
      if (isLogin) {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCHfXt29GTRNx06lTpcLg5ti3j8jyvIxLI";
      } else {
        //Create a new user
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCHfXt29GTRNx06lTpcLg5ti3j8jyvIxLI";
      }

      //Login or Signup request
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.ok) {
            setError({ error: false, message: "" });
            return res.json();
          } else {
            res.json().then((data) => {
              //Error Handlers
              const erroReturn = data.error.message;
              switch (erroReturn) {
                case "EMAIL_EXISTS":
                  setError({
                    error: true,
                    message: "Email already registered!",
                  });
                  break;
                case "WEAK_PASSWORD : Password should be at least 6 characters":
                  setError({
                    error: true,
                    message: "Enter at least 6 characters long password!",
                  });
                  break;
                case "MISSING_PASSWORD":
                  setError({
                    error: true,
                    message: "Please enter a valid password!",
                  });
                  break;
                case "INVALID_PASSWORD":
                  setError({
                    error: true,
                    message: "Invalid email or password!",
                  });
                  break;
                case "EMAIL_NOT_FOUND":
                  setError({
                    error: true,
                    message: "Invalid email or password!",
                  });
                  break;
                default:
                  break;
              }
            });
          }
        })
        .then((data) => {
          //Successful signup
          authCtx.login(data);
          navigate("/");
        });
    }
  };

  //Form to be returned
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler} noValidate>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" ref={passwordInputRef} />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          {isLogin && (
            <>
              <br></br>
              <button className="google-btn" onClick={handleLoginGoogle}>
                <img
                  className="google-icon"
                  src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                  alt="GoogleLogo"
                />
                <span className="btn-text">
                  <b>&nbsp;&nbsp;Sign in with google</b>
                </span>
              </button>
            </>
          )}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
          {error.error ? <span>{error.message}</span> : ""}
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
