import React, { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Room = ({ socket, name, room, setName, setRoom }) => {
  const navigate = useNavigate();

  const joinRoom = () => {
    if (name && room) {
        localStorage.setItem("room",room)
        localStorage.setItem("name",name)
      socket.emit("join", { name, room });
      navigate("/chat");
    }
  };
  return (
    <Fragment>
      <form className="flex flex-col h-screen justify-center items-center bg-slate-100 shadow-md rounded-md p-6 max-w-md mx-auto">
        <h1>Join a Room</h1>
          <input
            type="text"
            className="block w-full p-2 border border-gray-300 rounded-md mb-4"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            className="block w-full p-2 border border-gray-300 rounded-md mb-4"
            placeholder="Room"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            required
          />
          <button
            className="block w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            onClick={joinRoom}
          >
            Join
          </button>
      </form>
    </Fragment>
  );
};

export default Room;
