import avatar from "../assets/avatar.svg";

function SideBar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__header">
        <p className="sidebar__username">Terrence Tegegne</p>
        <img className="sidebar__avatar" alt="user avatar" src={avatar} />
      </div>
    </aside>
  );
}

export default SideBar;
