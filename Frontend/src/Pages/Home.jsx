import { v4 as uuidV4 } from "uuid";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const createNewUuid = (e) => {
    e.preventDefault();
    const id = uuidV4();
    setRoomId(id);
    toast.success("Creating new room id.", { position: "top-right" });
  };

  const joinRoom = () => {
    if (!roomId || !username) {
      return toast.error("Please fill all the fields.", {
        position: "top-right",
      });
    }

    navigate(`/editor/${roomId}`, {
      state: {
        username,
      },
    });
    return toast.success("You entering in room.", {
      position: "top-right",
    });
  };

  const handleInputEvent = (e) => {
    if (e.code === "Enter") return joinRoom();
  };

  return (
    <div className="homePageWrapper flexStyle">
      <div className="formWrapper flexStyle">
        <h1 className="heading">Code Editor</h1>
        <p className="mainLabel">Paste Invitation Room Id</p>
        <input
          type="text"
          placeholder="ROOM ID"
          className="inputTag"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          onKeyUp={(e) => handleInputEvent(e)}
        />
        <input
          type="text"
          placeholder="User Name"
          className="inputTag"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyUp={(e) => handleInputEvent(e)}
        />
        <button className="btn btnJoin" onClick={joinRoom}>
          JOIN
        </button>
        <p className="inviteBtn">
          If you don't have an invite then create &nbsp;
          <a href="" target={"_blank"} onClick={(e) => createNewUuid(e)}>
            New Room
          </a>
        </p>
      </div>
      <footer className="footer">
        Built with 🖤 by
        <a href="https://github.com/rushi-mungse"> Rushikesh Mungse</a>
      </footer>
    </div>
  );
};

export default Home;
