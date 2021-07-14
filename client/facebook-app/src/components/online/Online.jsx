import "./online.css";

const Online = ({ user }) => {
  //   console.log(user);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <li className="RightbarFriendListItem">
      <img src={PF + user.profilePic} alt="" className="RightbarProfileImg" />
      <span className="RightbarOnline"></span>
      <span className="RightbarText">{user.username}</span>
    </li>
  );
};

export default Online;
