import { useEffect, useState } from "react";
import axios from "axios";
import Topbar from "./../../components/topbar/Topbar";
import Sidebar from "./../../components/sidebar/Sidebar";
import Feed from "./../../components/feed/Feed";
import Rightbar from "./../../components/rightbar/Rightbar";
import { useParams } from "react-router-dom";
import "./profile.css";

const Profile = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});

  const { username } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`/users?username=${username}`);
      setUser(response.data);
    };

    fetchUser();
  }, [username]);

  return (
    <>
      <Topbar />
      <div className="Profile">
        <Sidebar />
        <div className="ProfileRight">
          <div className="ProfileRightTop">
            <div className="ProfileCover">
              <img
                src={
                  user.coverPic ? PF + user.coverPic : PF + "defaultCover.jpg"
                }
                alt=""
                className="ProfileCoverImg"
              />
              <img
                src={
                  user.profilePic ? PF + user.profilePic : PF + "default.jpeg"
                }
                alt=""
                className="ProfileUserImg"
              />
            </div>
            <div className="ProfileCoverInfo">
              <h4 className="ProfileInfoName">{user.username}</h4>
              <span className="ProfileInfoDesc">{user.desc}</span>
            </div>
          </div>

          <div className="ProfileRightBottom">
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
