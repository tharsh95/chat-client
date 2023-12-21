// import { Fragment, useState } from "react";
// import "./App.css";
// import io from "socket.io-client";
// import Chat from "./components/Chat";
// import Room from "./components/Room";
// import { Route, Routes } from "react-router-dom";
// const socket = io.connect("http://localhost:3001");

// function App() {
//   const [name, setName] = useState("");
//   const [room, setRoom] = useState("");
//   return (
//     <>
//       <Routes>
//         <Route
//           path="/"
//           element={
//             <Room
//               socket={socket}
//               room={room}
//               setRoom={setRoom}
//               name={name}
//               setName={setName}
//             />
//           }
//         />
//         <Route
//           path="/chat"
//           element={<Chat socket={socket} name={name} room={room} />}
//         />
//       </Routes>
//     </>
//   );
// }

// export default App;
import { Fragment, useState, useEffect } from "react";
import "./App.css";
import io from "socket.io-client";
import Chat from "./components/Chat";
import Room from "./components/Room";
import { Route, Routes, useNavigate } from "react-router-dom";

const socket = io.connect("http://localhost:3001");

function App() {
  const [name, setName] = useState(sessionStorage.getItem("name") || "");
  const [room, setRoom] = useState(sessionStorage.getItem("room") || "");
  const navigate = useNavigate();

  useEffect(() => {
    if (!name || !room) {
      // Redirect to the room selection page if name or room is not set
      navigate("/");
    } else {
      // Join the room when the component mounts
      socket.emit("join", { name, room });
    }

    // Cleanup on component unmount
    return () => {
      // socket.emit("disconnect");
      // socket.off();
    };
  }, [name, room, navigate]);

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
