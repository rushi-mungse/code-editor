import { useRef, useState, useEffect } from "react";
import Client from "../Components/Client";
import Editor from "../Components/Editor";
import toast from "react-hot-toast";
import { initSocket } from "../socket";
import {
  useNavigate,
  useParams,
  useLocation,
  Navigate,
} from "react-router-dom";
import { JOIN, JOINED } from "../actions";

const EditorPage = () => {
  const socketRef = useRef(null);
  const reactNavigator = useNavigate();
  const { id: roomId } = useParams();
  const location = useLocation();

  const [clients, setClients] = useState([]);

  const hoverInUsers = (user) => {
    return toast.success(`Full Name : ${user}`, {
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

      socketRef.current.emit(JOIN, {
        roomId,
        username: location.state?.username,
      });

      socketRef.current.on(JOINED, ({ socketId, username, clients }) => {
        console.log(username, clients);
        if (username !== location.state?.username) {
          toast.success(`${username} joined the room.`, {
            position: "top-right",
          });
          console.log(`${username} joined`);
        }

        setClients(clients);
      });
    };
    init();
  }, []);

  if (!location.state) {
    return <Navigate to="/" />;
  }

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
