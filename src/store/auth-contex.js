import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  userId: '',
  userName: '',
  avatar: '',
  login: () => {},
  logout: () => { },
  updateUserData: () => {}
});

//Clean local Storage
const cleanLocalStorage = () => {
  localStorage.removeItem("trivia_idToken");
  localStorage.removeItem("trivia_email");
  localStorage.removeItem("trivia_localId");
  localStorage.removeItem("trivia_displayName");
  localStorage.removeItem("trivia_expirationTime");
};

//Handler time expiration for token
var logoutTimer;

const calculateTimeLeft = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExTime = new Date(expirationTime).getTime();

  const remainingTime = adjExTime - currentTime;

  return remainingTime;
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("trivia_idToken");
  const storedExpirationDate = localStorage.getItem("trivia_expirationTime");

  const remainingTime = calculateTimeLeft(storedExpirationDate);

  if (remainingTime <= 60000) {
    cleanLocalStorage();
    return null;
  }

  return {
    token: storedToken,
    duration: storedExpirationDate,
  };
};

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();
  let initalToken;
  if (tokenData) {
    initalToken = tokenData;
  }

  const [token, setToken] = useState(initalToken);
  const [userId, setUserId] = useState(null)
  const [avatar, setAvatar] = useState('')
  const [username, setUsername] = useState('')

  const userIsLoggedIn = !!token;

  const logoutHandler = () => {
    setToken(null);
    setUserId(null)
    setAvatar('')
    setUsername('')
    cleanLocalStorage();

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  };

  const loginHandler = (userData) => {
    if (!userData.idToken) return;
    setToken(userData.idToken);
    setUserId(userData.localId)
    localStorage.setItem("trivia_idToken", userData.idToken);
    localStorage.setItem("trivia_email", userData.email);
    localStorage.setItem("trivia_localId", userData.localId);
    localStorage.setItem("trivia_displayName", userData.displayName);

    //Expeiration time
    const expires = new Date(
      new Date().getTime() + +userData.expiresIn * 1000
    ).toISOString();
    localStorage.setItem("trivia_expirationTime", expires);

    const timeLeft = calculateTimeLeft(expires);

    logoutTimer = setTimeout(logoutHandler, timeLeft);
  };

  const updateUserData = (userData) => {
    if (userData?.avatar) {
      setAvatar(userData.avatar)
    }
    if (userData?.username) {
      setUsername(userData.username)
    }
  }

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    userId: userId,
    login: loginHandler,
    logout: logoutHandler,
    username: username,
    avatar: avatar,
    updateUserData: updateUserData
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
