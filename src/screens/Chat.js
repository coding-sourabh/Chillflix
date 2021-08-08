import React, { useState, useRef } from "react";
import Nav from "../Nav.js";
import "./Chat.css";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import db, { auth } from "../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import firebase from "firebase";
import avatar from './avatar.jpg';

function Chat() {
  const [purl, setpurl] = useState("");
  db.collection("messages")
    .where("uid", "==", auth.currentUser.uid)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        setpurl(doc.data().photoURL);
      });
    });

  return (
    <div className="Chat">
      <div className="topContainer" style={{ backgroundColor: "#e50914" }}>
        <div className="chatHeaderContainer">
        <img src = "http://www.pngmart.com/files/7/Live-Chat-PNG-Picture.png" style = {{height : "60px" , width : "130px"}}/>
          <img  className = "headImg"
            src={purl}
            style={{
              height: "50px",
              width: "50px",
              borderRadius: "50%",
              marginLeft: "200px",
            }}
          />
        </div>
      </div>

      <div className="middleContainer">
        <ChatRoom />
      </div>
    </div>
  );
}

function ChatRoom() {
  const user = useSelector(selectUser); // selector for getting back the state user from firestore

  // To update certain field after fetching the required document which matches current user uid
  db.collection("messages")
    .where("uid", "==", auth.currentUser.uid)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        // console.log(doc.id, " => ", doc.data().text);
        // doc.ref.update({photoURL: url})
      });
    });

  const dummy = useRef();

  const messageRef = db.collection("messages");
  const query = messageRef.orderBy("createdAt").limit(25);
  const [messages] = useCollectionData(query, { idField: "id" });

  const [formValue, setformValue] = useState("");

  // now write to firestore
  const sendMessage = async (e) => {
    e.preventDefault();
    const { uid, photoURL } = auth.currentUser;

    await messageRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    });

    setformValue("");

    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Nav />
      <div className="mainContent">
        <div>
          {messages &&
            messages.map((mssg) => (
              <ChatMessage key={mssg.id} message={mssg} userName={user.email} />
            ))}
        </div>

        <div ref={dummy}></div>
      </div>

      <form className="formClass" onSubmit={sendMessage}>
        <input
          style={{ backgroundColor: "white", color: "black" }}
          className="inputClass"
          value={formValue}
          onChange={(e) => setformValue(e.target.value)}
        />
        <button
          className="buttonClass"
          type="submit"
          disabled={!formValue}
          style={{ backgroundColor: "#e50914" }}
        >
          📧
        </button>
      </form>
    </>
  );
}

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? "sent" : "recieved";
  return (
    <div className={`message ${messageClass}`}>
      <img className="avatar" src={photoURL ? photoURL : avatar} />
      <p
        style={
          messageClass === "sent" ? { color: "white" } : { color: "black" }
        }
      >
        {" "}
        {text}
      </p>
    </div>
  );
}
export default Chat;
