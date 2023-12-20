import { useState, useEffect } from "react";

const YourChatComponent = ({ socket, room, name }) => {
  const [message, setMessage] = useState("");
  const [rData, setRData] = useState([]);
  const send = async () => {
    if (room && name) {
      await socket.emit("send", {
        room,
        message,
        name,
        // time:new Date(Date.now()).getHours
      });
      //   setMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive", (data) => {
      setRData((prevData) => [...prevData, data]);
    });
  }, [socket]);
  return (
    <div className="bg-slate-800 overflow-scroll w-1/2 mx-auto shadow-md rounded-md p-4 flex flex-col h-screen">
      {rData?.map((el) => (
        <div
          className={`m-2 p-4 rounded-lg  ${
            el.name === name
              ? "bg-white  flex flex-col justify-end"
              : "bg-green-200"
          }`}
        >
          <p className="text-lg">{el.message}</p>
          <p className="text-xs">
            {" "}
            <span className="text-xs">By:</span>
            {name === el.name ? "You" : el.name}
          </p>
        </div>
      ))}
      <div className="mt-auto p-4    flex justify-center  sticky bottom-0 z-10">
        <input
          type="text"
          placeholder="Type your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="p-2 border border-gray-300  rounded-md mr-2 w-[100vw]"
        />
        <button
          onClick={send}
          disabled={message === ""}
          className={`p-2 rounded-md ${
            message === ""
              ? "bg-slate-200 cursor-not-allowed text-black"
              : "bg-blue-600 text-white"
          }`}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default YourChatComponent;
