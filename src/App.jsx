import { Fragment, useState } from "react";
import "./App.css";
import io from "socket.io-client";
import Chat from "./components/Chat";
import Room from "./components/Room";
import { Route, Routes } from "react-router-dom";
const socket = io.connect("http://localhost:3001");

function App() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Room
              socket={socket}
              room={room}
              setRoom={setRoom}
              name={name}
              setName={setName}
            />
          }
        />
        <Route
          path="/chat"
          element={<Chat socket={socket} name={name} room={room} />}
        />
      </Routes>
    </>
  );
}

export default App;
