import React, { useState } from "react";
import "./LoginScreen.css";
import SignUpScreen from "./SignUpScreen";
import logo from "../assets/ChillFlix_logo.png";


function LoginScreen() {
  const [sighIn, setSighIn] = useState(false);

  return (
    <div className="loginScreen">
      <div className="loginScreen__Background">
        <img className="loginScreen__logo" src={logo} alt="" />

        <button
          onClick={() => {
            setSighIn(true);
          }}
          className="loginScreen__button"
        >
          Sign In
        </button>

        <div className="loginScreen__gradient" />

        <div className="loginScreen__body">
          {sighIn ? (
            <SignUpScreen />
          ) : (
            <>
              <h1>Unlimited fims , TV programmes and more.</h1>
              <h2>Watch anywhere.Cancel at any time.</h2>
              <h3>
                Ready to watch? Enter your email to create or restart your
                membership
              </h3>

              <div className="loginScreen__input">
                <form>
                  <input type="email" placeholder="Email address" />
                  <button
                    onClick={() => {
                      setSighIn(true);
                    }}
                    className="loginScreen__getStarted"
                  >
                    GET STARTED
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
