import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import logo from "../assets/wtwr-logo.svg";
import avatar from "../assets/avatar.svg";
import hamburger from "../assets/hamburger-btn.svg";
import closeBtn from "../assets/close-btn.svg";
import ToggleSwitch from "./ToggleSwitch";

function Header({
  handleOpenAddClothesModal,
  handleOpenRegisterModal,
  handleOpenLoginModal,
  handleMobileMenu,
  handleLogin,
  handleLogout,
  isLoggedIn,
  isMobileMenuOpened,
  handleCloseMobileMenu,
  weatherData,
}) {
  const now = new Date();

  return (
    <>
      <header className="header">
        <div className="header__container">
          <NavLink to="/" className="">
            <img className="header__logo" alt="site logo" src={logo} />
          </NavLink>
          <p className="header__data">
            <time className="header__datetime" dateTime={now}>
              {now.toLocaleDateString("default", {
                day: "numeric",
                month: "long",
              })}
            </time>
            , {weatherData.location}
          </p>
        </div>

        <div
          className={`header__account ${
            isLoggedIn ? "header__account-hidden" : ""
          }`}
        >
          <ToggleSwitch />
          <button
            className="header__signup-btn"
            onClick={handleOpenRegisterModal}
          >
            Sign Up
          </button>
          <button className="header__login-btn" onClick={handleOpenLoginModal}>
            Log In
          </button>
        </div>

        {/* desktop header */}
        <div
          className={`header__profile header__profile-desktop ${
            !isLoggedIn ? "header__profile-hidden" : ""
          }`}
        >
          <ToggleSwitch />
          <button
            className="header__add-clothes-btn"
            onClick={handleOpenAddClothesModal}
          >
            + Add clothes
          </button>
          <NavLink to="/profile" className="header__link">
            <p className="header__username">Terrence Tegegne</p>
            <img className="header__avatar" alt="user avatar" src={avatar} />
          </NavLink>
        </div>

        {/* mobile header */}
        <div className="header__profile header__profile-mobile header__profile-hidden">
          <button
            className={`header__hamburger-btn${
              isMobileMenuOpened ? " header__hamburger-btn-hidden " : ""
            }`}
            onClick={handleMobileMenu}
            aria-label="Toggle menu"
          >
            <img
              src={hamburger}
              alt="menu button"
              className="header__hamburger-btn-img"
            />
          </button>
        </div>

        {/* header menu for mobile devices */}
        <div
          className={`header__menu ${
            isMobileMenuOpened ? "header__menu-is-opened" : ""
          }`}
        >
          <button
            className="header__menu-close-btn"
            onClick={handleCloseMobileMenu}
          >
            <img src={closeBtn} alt="close button" />
          </button>
          <button
            className="header__add-clothes-btn"
            onClick={handleOpenAddClothesModal}
          >
            + Add clothes
          </button>
          <div className="header__user-wrapper">
            <p className="header__username">Terrence Tegegne</p>
            <img className="header__avatar" alt="user avatar" src={avatar} />
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
