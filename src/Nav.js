import React, { useState, useEffect } from "react";
import "./Nav.css";
import { useHistory } from "react-router-dom";
import logo from "./assets/ChillFlix_logo.png";
import chatLogo from "./assets/mssglogo.jpg";
function Nav() {
  const [show, handleShow] = useState(true);
  const history = useHistory();

  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      // if we scrolled full screen to the bottom then handleshow becomes true
      handleShow(true);
    } else {
      handleShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar); // When there will be scroll event transitionNavBar function will be triggered
    // Clean up funtion
    return () => window.removeEventListener("scroll", transitionNavBar);
  }, []);

  return (
    // basically it means if show is true only then render nav__black
    <div className={`nav ${show && "nav__black"}`}>
      <div className="nav__contents">
        <img
          onClick={() => history.push("/")}
          className="nav__logo"
          src={logo}
        />

        <img
          onClick={() => history.push("/profile")}
          className="nav__avatar"
          src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png"
        />
        <img
          onClick={() => history.push("/chat")}
          className="chatLogo"
          src={chatLogo}
        />
      </div>
    </div>
  );
}

export default Nav;
