import {
  RssFeed,
  Chat,
  PlayCircleFilledOutlined,
  Group,
  Bookmark,
  HelpOutline,
  WorkOutline,
  Event,
  School,
} from "@material-ui/icons";
import { Users } from "../../dummyData";
import Friend from "../friend/Friend";
import "./sidebar.css";

const Sidebar = () => {
  return (
    <div className="Sidebar">
      <div className="SidebarWrapper">
        <div className="SidebarList">
          <ul className="SidebarList">
            <li className="SidebarListItem">
              <RssFeed className="SidebarIcon" />
              <span className="SidebarListItemText">Feed</span>
            </li>
            <li className="SidebarListItem">
              <PlayCircleFilledOutlined className="SidebarIcon" />
              <span className="SidebarListItemText">Videos</span>
            </li>
            <li className="SidebarListItem">
              <Chat className="SidebarIcon" />
              <span className="SidebarListItemText">Chats</span>
            </li>
            <li className="SidebarListItem">
              <Group className="SidebarIcon" />
              <span className="SidebarListItemText">Groups</span>
            </li>
            <li className="SidebarListItem">
              <Bookmark className="SidebarIcon" />
              <span className="SidebarListItemText">BookMarks</span>
            </li>
            <li className="SidebarListItem">
              <HelpOutline className="SidebarIcon" />
              <span className="SidebarListItemText">Questions</span>
            </li>
            <li className="SidebarListItem">
              <WorkOutline className="SidebarIcon" />
              <span className="SidebarListItemText">Jobs</span>
            </li>
            <li className="SidebarListItem">
              <Event className="SidebarIcon" />
              <span className="SidebarListItemText">Events</span>
            </li>
            <li className="SidebarListItem">
              <School className="SidebarIcon" />
              <span className="SidebarListItemText">Courses</span>
            </li>
          </ul>
          <button className="SidebarBtn">Show More</button>
          <hr className="SidebarHr" />
          <ul className="SidebarFriendList">
            {Users.map((user) => (
              <Friend key={user.id} user={user} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
