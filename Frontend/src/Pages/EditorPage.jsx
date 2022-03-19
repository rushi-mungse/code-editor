import { useState } from "react";
import Client from "../Components/Client";
import Editor from "../Components/Editor";
import toast from "react-hot-toast";
const EditorPage = () => {
  const [clients, setClients] = useState([
    { socketId: 1, username: "Rushikesh Mahadev Mungse" },
    { socketId: 2, username: "Rahul B" },
    { socketId: 3, username: "Hari M" },
  ]);

  const hover = (user) => {
    return toast.success(`${user}`, {
      position: "top-right",
    });
  };

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
                  onMouseHover={() => hover(client.username)}
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
