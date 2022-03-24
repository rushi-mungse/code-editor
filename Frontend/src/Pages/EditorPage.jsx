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
import { CODE_SYNC, DISCONNECTED, JOIN, JOINED } from "../actions";

const EditorPage = () => {
  const socketRef = useRef(null);
  const reactNavigator = useNavigate();
  const { id: roomId } = useParams();
  const location = useLocation();
  const codeRef = useRef(null);
  const [clients, setClients] = useState([]);

  const hoverInUsers = (user) => {
    return toast.success(`Full Name : ${user}`, {
      position: "top-right",
    });
  };

  const copyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success(`Room ID has been copied to your clipboard.`, {
        position: "top-right",
      });
    } catch (error) {
      console.log(error);
      toast.error(`Could not copy roomId.`, { position: "top-right" });
    }
  };

  const leaveRoom = () => {
    return reactNavigator("/");
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
        if (username !== location.state?.username) {
          toast.success(`${username} joined the room.`, {
            position: "top-right",
          });
        }

        setClients(clients);

        socketRef.current.emit(CODE_SYNC, { code: codeRef.current, socketId });
      });

      socketRef.current.on(DISCONNECTED, ({ socketId, username }) => {
        toast.success(`${username} left the room`, { position: "top-right" });
        setClients((prev) => {
          return prev.filter((client) => client.socketId !== socketId);
        });
      });
    };

    init();

    return () => {
      socketRef.current.disconnect();
      socketRef.current.off(JOINED);
      socketRef.current.off(DISCONNECTED);
    };
  }, []);

  if (!location.state) {
    return <Navigate to="/" />;
  }

  return (
    <div className="editorPageWrapper">
      <div className="leftSide">
        <div className="innerSide">
          <h1 className="heading editPageHeading">Code Editor</h1>
          <h1 className="userConnected">Connected </h1>
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
          <button className="btn copyBtn" onClick={copyRoomId}>
            Copy Room ID
          </button>
          <button className="btn leaveBtn" onClick={leaveRoom}>
            Leave Room
          </button>
        </div>
      </div>
      <div className="rightSide">
        <Editor
          socketRef={socketRef}
          roomId={roomId}
          onCodeChange={(code) => {
            codeRef.current = code;
          }}
        />
      </div>
    </div>
  );
};

export default EditorPage;
