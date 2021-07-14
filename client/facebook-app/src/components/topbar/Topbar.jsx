import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./../../context/AuthContext";
const Topbar = () => {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  console.log(user.profilePic);
  return (
    <div className="TopbarContainer">
      <div className="TopLeft">
        <Link to="/">
          <span className="LogoTitle">Facebook</span>
        </Link>
      </div>
      <div className="TopCenter">
        <div className="Searchbar">
          <Search className="TopSearchIcon" />
          <input
            type="text"
            placeholder="Search for friends, posts and videos"
            className="SearchInput"
          />
        </div>
      </div>
      <div className="TopRight">
        <div className="TopLinks">
          <span className="TopLink">Homepage</span>
          <span className="TopLink">Timeline</span>
        </div>
        <div className="TopIcons">
          <div className="TopIconItem">
            <Person />
            <span className="TopIconBadge">1</span>
          </div>
          <div className="TopIconItem">
            <Chat />
            <span className="TopIconBadge">2</span>
          </div>
          <div className="TopIconItem">
            <Notifications />
            <span className="TopIconBadge">1</span>
          </div>
        </div>
        <Link to={`profile/${user.username}`}>
          <img
            src={user.profilePic ? PF + user.profilePic : PF + "default.jpeg"}
            alt=""
            className="TopImg"
          />
        </Link>
      </div>
    </div>
  );
};

export default Topbar;
