import Avatar from "react-avatar";

const Client = ({ username }) => {
  return (
    <div className="flexStyle avatar">
      <Avatar name={username} size={50} round="14px" />
      <sapn className="username">{username}</sapn>
    </div>
  );
};

export default Client;
