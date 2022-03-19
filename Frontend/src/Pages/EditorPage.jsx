import { useRef, useState, useEffect } from "react";
import Client from "../Components/Client";
import Editor from "../Components/Editor";
import toast from "react-hot-toast";
import { initSocket } from "../socket";
import { useNavigate } from "react-router-dom";

const EditorPage = () => {
  const socketRef = useRef(null);
  const reactNavigator = useNavigate();

  const [clients, setClients] = useState([
    { socketId: 1, username: "Rushikesh Mungse" },
    { socketId: 2, username: "Rahul B" },
    { socketId: 3, username: "Hari M" },
  ]);

  const hoverInUsers = (user) => {
    return toast.success(`${user}`, {
      position: "top-right",
    });
  };

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on("connect_error", (err) => handleErrors(err));
      socketRef.current.on("connect_failed", (err) => handleErrors(err));

      function handleErrors(e) {
        console.log("socket error", e);
        toast.error("Socket connection failed, try again later.", {
          position: "top-right",
        });
        return reactNavigator("/");
      }
    };
    init();
  }, []);

  return (
    <div className="editorPageWrapper">
      <div className="leftSide">
        <div className="innerSide">
          <h1 className="heading editPageHeading">Code Editor</h1>
          <h1 className="userConnected">Connected users</h1>
          <div className="userAvatars">
            {clients.map((client) => {
              return (
                <Client
                  onMouseHover={() => hoverInUsers(client.username)}
                  username={
                    client.username.length > 8
                      ? `${client.username.slice(0, 8)}... `
                      : client.username
                  }
                  key={client.socketId}
                />
              );
            })}
          </div>
        </div>
        <div className="btns">
          <button className="btn copyBtn">Copy Code</button>
          <button className="btn leaveBtn">Leave Room</button>
        </div>
      </div>
      <div className="rightSide">
        <Editor />
      </div>
    </div>
  );
};

export default EditorPage;
