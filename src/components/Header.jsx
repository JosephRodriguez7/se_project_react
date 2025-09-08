import "./blocks/header.css";
import logo from "../assets/wtwr-logo.svg";
import avatar from "../assets/avatar.svg";

function Header() {
  const now = new Date();

  return (
    <>
      <header className="header">
        <div className="header__container">
          <img className="header__logo" alt="site logo" src={logo} />
          <p className="header__data">
            <time className="header__datetime" dateTime={now}>
              {now.toLocaleDateString("default", {
                day: "numeric",
                month: "long",
              })}
            </time>
            , New York
          </p>
        </div>
        <div className="header__profile">
          <button className="header__add-clothes-btn">+ Add clothes</button>
          <p className="header__username">Terrence Tegegne</p>
          <img className="header__avatar" alt="user avatar" src={avatar} />
        </div>
      </header>
    </>
  );
}

export default Header;
