import React, { useState } from "react";
import style from "./Header.module.css";

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <>
      <header className={style.header}>
        <nav className={style.nav}>
          <ul className={style.navList}>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="/catlog">Catalog</a>
            </li>
            <li>
              <a href="#">Contact</a>
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
    </>
  );
};

export default Header;
