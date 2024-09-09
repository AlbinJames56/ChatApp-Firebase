import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  orderBy,
  addDoc,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { signOut } from "firebase/auth";
function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Listen for real-time updates in Firestore
  useEffect(() => {
    const messagesRef = collection(db, "messages");
    const q = query(messagesRef, orderBy("createdAt"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let messagesArray = [];
      querySnapshot.forEach((doc) => {
        messagesArray.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messagesArray);
    });

    return () => unsubscribe();
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    const { uid, displayName } = auth.currentUser;

    await addDoc(collection(db, "messages"), {
      text: newMessage,
      name: displayName,
      uid,
      createdAt: serverTimestamp(),
    });

    setNewMessage(""); // Clear input
  };

  const handleSignOut = () => {
    signOut(auth);
  };

  return (
    <div className="container my-5">
      <button className="btn btn-danger mb-4 mx-auto" onClick={handleSignOut}>
        Sign out
      </button>
      <div className="card shadow chat-room">
        <div className="card-header bg-primary text-white">
          <h5>Realtime Chat Room</h5>
        </div>
        <div
          className="card-body messages"
          style={{ maxHeight: "400px", overflowY: "scroll" }}
        >
          <ul className="list-group">
            {messages.map((message) => (
              <li key={message.id} className="list-group-item">
                <strong>{message.name}:</strong> {message.text}
              </li>
            ))}
          </ul>
        </div>
        <div className="card-footer">
          <form onSubmit={handleSendMessage} className="d-flex">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message"
              className="form-control me-2"
            />
            <button type="submit" className="btn btn-primary">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChatRoom;
