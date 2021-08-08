import React, { useEffect } from "react";
import "./App.css";
import HomeScreen from "./screens/HomeScreen";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
import ProfileScreen from "./screens/ProfileScreen";
import Footer from "./Footer";
import Chat from "./screens/Chat.js";


function App() {


  const user = useSelector(selectUser); // selector for getting back the state user from firestore
  const dispatch = useDispatch(); // action like login,logout will be performed with the help of dispatch

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        //  Logged in , We are going to push user into the firestore so that it is accessible all over our app.
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
          })
        );
      } else {
        //Logged out
        console.log("logged out");
        dispatch(logout());
      }
    });

    return unsubscribe; // Cleanup
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        {!user ? (
          <LoginScreen />
        ) : (
          <Switch>
            <Route path="/profile">
              <ProfileScreen />
            </Route>
            <Route path="/chat">
              <Chat />
            </Route>
            <Route exact path="/">
              <HomeScreen />
            </Route>
          </Switch>
        )}
      </Router>
      {/* <Footer /> */}
    </div>
  );
}

export default App;

// We can add "exact" before path if want exactly that route only
