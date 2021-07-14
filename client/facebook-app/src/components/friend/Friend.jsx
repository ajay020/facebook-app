import "./friend.css";

const Friend = ({ user }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <li className="SidebarFriend">
      <img src={PF + user.profilePic} alt="" className="SidebarFriendImg" />
      <span className="SidebarFriendName">{user.username}</span>
    </li>
  );
};

export default Friend;
