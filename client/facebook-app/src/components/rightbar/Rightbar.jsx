import axios from "axios";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { Link } from "react-router-dom";
import { Add, Remove } from "@material-ui/icons";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "./../../context/AuthContext";
import "./rightbar.css";

const Rightbar = ({ user }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setfollowed] = useState(
    currentUser.followings.includes(user?.id)
  );

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const friendList = await axios.get("/users/friends/" + user._id);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    if (user) {
      fetchFriends();
    }
  }, [user]);

  useEffect(() => {
    setfollowed(currentUser.followings.includes(user?.id));
  }, [currentUser, user?.id]);

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put("/users/" + user._id + "/unfollow", {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put("/users/" + user._id + "/follow", {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
    } catch (error) {
      console.log(error);
    }
    setfollowed(!followed);
  };

  const HomeRightbar = () => {
    return (
      <>
        <div className="BdayContainer">
          <img src={`${PF}gift.jpg`} alt="" className="BdayImg" />
          <span className="BdayText">
            <b>Foster</b> and <b>3 other friends</b> have birthday todday
          </span>
        </div>
        <img src="/assets/ad.jpg" alt="" className="AdImg" />
        <h4 className="RightbarTitle">Online Friends</h4>
        <ul className="RightbarFriendList">
          {Users.map((user) => (
            <Online key={user.id} user={user} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="RightbarFollowBtn" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="RightbarTitle">User Info</h4>
        <div className="RightbarInfo">
          <div className="RightbarInfoItem">
            <span className="RightbarInfoKey">City:</span>
            <span className="RightbarInfoValue">{user.city}</span>
          </div>
          <div className="RightbarInfoItem">
            <span className="RightbarInfoKey">From:</span>
            <span className="RightbarInfoValue">{user.from}</span>
          </div>
          <div className="RightbarInfoItem">
            <span className="RightbarInfoKey">Relationship:</span>
            <span className="RightbarInfoValue">
              {user.relationship === 1
                ? "Single"
                : user.relationship === 2
                ? "Marrid"
                : "-"}
            </span>
          </div>
        </div>
        <h4 className="RightbarTitle">User Friends</h4>
        <div className="RightbarFollowings">
          {friends.length === 0 ? <p>No friend</p> : ""}
          {friends.map((friend) => (
            <Link to={"/profile/" + friend.username}>
              <div key={friend._id} className="RightbarFollowing">
                <img
                  src={
                    friend.profilePic
                      ? PF + friend.profilePic
                      : PF + "default.jpeg"
                  }
                  alt=""
                  className="RightbarFollowingImg"
                />
                <span className="RightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="Rightbar">
      <div className="RightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
};

export default Rightbar;
