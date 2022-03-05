import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCHfXt29GTRNx06lTpcLg5ti3j8jyvIxLI",
  authDomain: "trivia-chomp-c5a02.firebaseapp.com",
  databaseURL: "https://trivia-chomp-c5a02-default-rtdb.firebaseio.com",
  projectId: "trivia-chomp-c5a02",
  storageBucket: "trivia-chomp-c5a02.appspot.com",
  messagingSenderId: "926826945337",
  appId: "1:926826945337:web:d8dd637542b4ab1948a6e8",
};

firebase.initializeApp(firebaseConfig);
var auth = firebase.auth();
var provider = new firebase.auth.GoogleAuthProvider(); 
export {auth , provider};
