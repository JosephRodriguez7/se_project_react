import { useNavigate } from "react-router-dom";
import avatar from "../assets/avatar.svg";

function SideBar({ handleLogoutUser }) {
  const navigate = useNavigate();

  const handleLogoutButton = () => {
    handleLogoutUser();
    navigate("/");
  };

  return (
    <aside className="sidebar">
      <div className="sidebar__header">
        <p className="sidebar__username">Terrence Tegegne</p>
        <img className="sidebar__avatar" alt="user avatar" src={avatar} />
      </div>
      <div className="sidebar__content">
        <button className="sidebar__profile-btn">Change profile data</button>
        <button className="sidebar__logout-btn" onClick={handleLogoutButton}>
          Log out
        </button>
      </div>
    </aside>
  );
}

export default SideBar;
