import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const YourChatComponent = ({ setRoom, setName, socket, room, name }) => {
  const [message, setMessage] = useState("");
  const [_, setRData] = useState([]);
  const navigate = useNavigate();

  const send = async () => {
    if (room && name) {
      await socket.emit("send", {
        room,
        message,
        name,
        time: `${new Date(Date.now()).getHours()}:${new Date(
          Date.now()
        ).getMinutes()}`,
      });
      setMessage("");
      scrollToBottom();
    }
  };
  const chatContainerRef = useRef(null);

  // Function to scroll to the last element
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
      // chatContainerRef.current.scrollTop += 20;
      setTimeout(() => {
        chatContainerRef.current.scrollTop += 20;
      }, 100);
    }
  };
  useEffect(() => {
    const msgs = [];
    socket.on("receive", (data) => {
      msgs.push(data);
      sessionStorage.setItem("chats", JSON.stringify(msgs));
      setRData((prevData) => [...prevData, data]);
    });
    if (room === "") {
      navigate("/");
    }
  }, [socket, room]);
  return (
    <>
      <div
        className="bg-slate-800 w-1/2  mx-auto shadow-md rounded-md p-4 flex flex-col h-screen"
        ref={chatContainerRef}
      >
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-white">User:{name ? name : "Not connected"}</h1>
          <h2 className="text-white">Room:{room ? room : "Not connected"}</h2>
          <button
            className="bg-cyan-300 p-4 rounded-lg"
            onClick={() => {
              sessionStorage.clear();
              navigate("/");
              setRoom("");
              setName("");
            }}
          >
            Leave Room
          </button>
        </div>
        <div className="overflow-scroll">
          {JSON.parse(sessionStorage.getItem("chats"))?.map((el) => (
            <div
              className={`m-2 p-4 rounded-lg  ${
                el.name === name ? "bg-white " : "bg-green-200"
              }`}
            >
              <div>
                <p className="text-lg">{el.message}</p>
                <p className="text-xs">
                  {" "}
                  <span className="text-xs">By:</span>
                  {name === el.name ? "You" : el.name}
                </p>
              </div>
              <div>
                <p className="text-xs">{el.time}</p>
              </div>
            </div>
          ))}
        </div>
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
            disabled={message === "" || room === ""}
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
    </>
  );
};

export default YourChatComponent;
