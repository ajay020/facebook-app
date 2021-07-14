import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions,
  Cancel,
} from "@material-ui/icons";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "./../../context/AuthContext";
import axios from "axios";
import "./share.css";

const Share = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);
  const desc = useRef();
  const [file, setFile] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };

    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      try {
        console.log("data", data);
        await axios.post("/upload", data);
      } catch (error) {
        console.log(error);
      }
    }

    if (desc.current.value === "" && !file) {
      console.log("post something");
      return;
    }

    try {
      await axios.post("/posts", newPost);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="Share">
      <div className="ShareWrapper">
        <div className="ShareTop">
          <img
            src={user.profilePic ? PF + user.profilePic : PF + "default.jpeg"}
            alt=""
            className="ShareProfileImg"
          />
          <input
            placeholder={"What's in your mind " + user.username + "?"}
            type="text"
            className="ShareInput"
            ref={desc}
          />
        </div>
        <hr className="ShareHr" />
        {file && (
          <div className="ShareImgContainer">
            <img alt="" className="ShareImg" src={URL.createObjectURL(file)} />
            <Cancel className="CancelShareImg" onClick={() => setFile(null)} />
          </div>
        )}

        <form
          className="ShareBottom"
          encType="multipart/form-data"
          onSubmit={submitHandler}
        >
          <div className="ShareOptions">
            <label htmlFor="file" className="ShareOption">
              <PermMedia htmlColor="tomato" />
              <span className="ShareOptionText">Photo & Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className="ShareOption">
              <Label htmlColor="blue" />
              <span className="ShareOptionText">Tag</span>
            </div>
            <div className="ShareOption">
              <Room htmlColor="green" />
              <span className="ShareOptionText">Location</span>
            </div>
            <div className="ShareOption">
              <EmojiEmotions htmlColor="goldenrod" />
              <span className="ShareOptionText">Feelings</span>
            </div>
          </div>
          <button className="ShareBtn" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
};

export default Share;
