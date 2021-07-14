import { MoreVert, Favorite, ThumbUp } from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import axios from "axios";
import { format } from "timeago.js";

import "./post.css";

const Post = ({ post }) => {
  const { user: currentUser } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [like, setLike] = useState(post.likes.length);
  const [isLike, setisLike] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    setisLike(post.likes.includes(currentUser._id));
  }, [post.likes, currentUser._id]);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`/users?userId=${post.userId}`);
      setUser(response.data);
    };

    fetchUser();
  }, [post.userId]);

  const handleLike = async () => {
    setLike(isLike ? like - 1 : like + 1);
    setisLike(!isLike);
    try {
      await axios.put(`/posts/${post._id}/like`, { userId: currentUser._id });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="Post">
      <div className="PostWrapper">
        <div className="PostTop">
          <div className="PostTopLeft">
            <Link to={`profile/${user.username}`}>
              <img
                src={user.profilePic ? user.profilePic : PF + "default.jpeg"}
                alt=""
                className="PostProfileImg"
              />
            </Link>
            <span className="PostUsername">{user.username}</span>
            <span className="PostDate">{format(post.createdAt)}</span>
          </div>
          <div className="PostTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="PostCenter">
          <span className="PostText">{post.desc}</span>
          <img src={PF + post.img} alt="" className="PostImg" />
        </div>
        <div className="PostBottom">
          <div className="PostBottomLeft">
            <Favorite
              htmlColor="red"
              onClick={handleLike}
              className="PostIcon"
            />
            <ThumbUp
              htmlColor="blue"
              onClick={handleLike}
              className="PostIcon"
            />
            <span className="PostLikeCounter">{like} people like it</span>
          </div>
          <div className="PostBottomRight">
            <span className="PostCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
