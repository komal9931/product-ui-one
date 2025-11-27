import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import style from "./Header.module.css";

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className={style.header}>
      <nav className={style.nav}>
        <ul className={style.navList}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? style.active : "")}
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? style.active : "")}
            >
              About
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/catalog"
              className={({ isActive }) => (isActive ? style.active : "")}
            >
              Catalog
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) => (isActive ? style.active : "")}
            >
              Contact
            </NavLink>
          </li>
        </ul>

        <div className={style.icons}>
          <span
            onMouseEnter={() => setShowSearch(true)}
            onMouseLeave={() => setShowSearch(false)}
          >
            <i className="ri-search-2-line"></i>
            {showSearch && (
              <div className={style.searchPopup}>
                <input type="text" placeholder="Search products..." />
              </div>
            )}
          </span>
          <span>
            <i className="ri-user-fill"></i>
          </span>
          <span>
            <i className="ri-shopping-cart-2-fill"></i>
          </span>
        </div>
      </nav>
    </header>
  );
};

export default Header;
