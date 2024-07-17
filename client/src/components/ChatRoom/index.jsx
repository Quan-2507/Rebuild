import React from "react";
import {
  MDBContainer,
  MDBRow
} from "mdb-react-ui-kit";
import UserChat from "../chat/UserChat";
import ChatBox from "../chat/ChatBox";
import Header from "../NavBar.jsx";

export default function ChatRoom() {
  return (
    <><Header /><MDBContainer fluid className="py-5" style={{ backgroundColor: "#eee" }}>
      <MDBRow>
        <UserChat />
        <ChatBox />
      </MDBRow>
    </MDBContainer></>
  );
}