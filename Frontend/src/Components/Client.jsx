import Avatar from "react-avatar";

const Client = ({ username, onMouseHover }) => {
  return (
    <div className="flexStyle avatar" onClick={onMouseHover}>
      <Avatar name={username} size={50} round="14px" />
      <span className="username">{username}</span>
    </div>
  );
};

export default Client;
