import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  userId: "",
  username: "",
  avatar: "",
  login: () => {},
  logout: () => {},
  updateUserData: () => {},
});

//Clean local Storage
const cleanLocalStorage = () => {
  localStorage.removeItem("trivia_idToken");
  localStorage.removeItem("trivia_localId");
  localStorage.removeItem("trivia_username");
  localStorage.removeItem("trivia_avatar");
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

const retrieveStoredUserData = () => {
  const storedUserId = localStorage.getItem("trivia_localId");
  const storedUsername = localStorage.getItem("trivia_username");
  const storedAvatar = localStorage.getItem("trivia_avatar");
  const storedToken = localStorage.getItem("trivia_idToken");
  const storedExpirationDate = localStorage.getItem("trivia_expirationTime");

  const remainingTime = calculateTimeLeft(storedExpirationDate);

  if (remainingTime <= 60000) {
    cleanLocalStorage();
    return null;
  }

  return {
    userId: storedUserId,
    username: storedUsername,
    avatar: storedAvatar,
    tokenData: {
      token: storedToken,
      duration: storedExpirationDate,
    },
  };
};

export const AuthContextProvider = (props) => {
  const userData = retrieveStoredUserData();

  const [token, setToken] = useState(userData?.tokenData || null);
  const [userId, setUserId] = useState(userData?.userId || null);
  const [avatar, setAvatar] = useState(userData?.avatar || "");
  const [username, setUsername] = useState(userData?.username || "");

  const userIsLoggedIn = !!token;

  const logoutHandler = () => {
    setToken(null);
    setUserId(null);
    setAvatar("");
    setUsername("");
    cleanLocalStorage();

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  };

  const loginHandler = (userData) => {
    if (!userData.idToken) return;
    setToken(userData.idToken);
    setUserId(userData.localId);
    localStorage.setItem("trivia_idToken", userData.idToken);
    localStorage.setItem("trivia_localId", userData.localId);

    //Expiration time
    const expires = new Date(
      new Date().getTime() + +userData.expiresIn * 1000
    ).toISOString();
    localStorage.setItem("trivia_expirationTime", expires);

    const timeLeft = calculateTimeLeft(expires);

    logoutTimer = setTimeout(logoutHandler, timeLeft);
  };

  const updateUserData = (userData) => {
    if (userData?.avatar) {
      setAvatar(userData.avatar);
      localStorage.setItem("trivia_avatar", userData.avatar);
    }
    if (userData?.username) {
      setUsername(userData.username);
      localStorage.setItem("trivia_username", userData.username);
    }
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    userId: userId,
    username: username,
    avatar: avatar,
    login: loginHandler,
    logout: logoutHandler,
    updateUserData: updateUserData,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
