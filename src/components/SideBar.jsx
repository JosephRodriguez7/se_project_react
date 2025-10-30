import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import avatar from "../assets/avatar.svg";
import CurrentUserContext from "../contexts/CurrentUserContext";

function SideBar({ handleLogoutUser, handleOpenEditUserModal }) {
  const navigate = useNavigate();

  const handleChangeButton = () => {
    handleOpenEditUserModal();
  };

  const handleLogoutButton = () => {
    handleLogoutUser();
    navigate("/");
  };

  const { currentUser } = useContext(CurrentUserContext);

  return (
    <aside className="sidebar">
      <div className="sidebar__header">
        <p className="sidebar__username">{currentUser.name}</p>
        <img
          className="sidebar__avatar"
          alt="user avatar"
          src={currentUser.avatar}
        />
      </div>
      <div className="sidebar__content">
        <button className="sidebar__profile-btn" onClick={handleChangeButton}>
          Change profile data
        </button>
        <button className="sidebar__logout-btn" onClick={handleLogoutButton}>
          Log out
        </button>
      </div>
    </aside>
  );
}

export default SideBar;
