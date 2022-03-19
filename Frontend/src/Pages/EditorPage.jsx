import { useState } from "react";
import Client from "../Components/Client";

const EditorPage = () => {
  const [clients, setClients] = useState([
    { socketId: 1, username: "Rushikesh M" },
    { socketId: 2, username: "Rahul B" },
    { socketId: 3, username: "Hari M" },
  ]);

  return (
    <div className="editorPageWrapper">
      <div className="leftSide">
        <div className="innerSide">
          <h1 className="heading editPageHeading">Code Editor</h1>
          <h1 className="userConnected">Connected users</h1>
          <div className="userAvatars">
            {clients.map((client) => {
              return (
                <Client username={client.username} key={client.socketId} />
              );
            })}
          </div>
        </div>
        <div className="btns">
          <button className="btn copyBtn">Copy Code</button>
          <button className="btn leaveBtn">Leave Room</button>
        </div>
      </div>
      <div className="rightSide">Editor is here</div>
    </div>
  );
};

export default EditorPage;
