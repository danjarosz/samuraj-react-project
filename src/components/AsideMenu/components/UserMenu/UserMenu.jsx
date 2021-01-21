import React from "react";
import { Link } from "react-router-dom";
import bemCssModules from "bem-css-modules";
import { default as AsideMenuStyles } from "../../AsideMenu.module.scss";

const style = bemCssModules(AsideMenuStyles);

const UserMenu = ({ isUserLogged }) => (
  <>
    <p className={style("title")}>Panel użytkownika</p>
    <nav>
      <ul className={style("list")}>
        <li className={style("link")}>
          <Link to="/">Kursy w sprzedaży</Link>
        </li>
        {isUserLogged && (
          <li className={style("link")}>
            <Link to="/my-courses">Moje zakupione kursy</Link>
          </li>
        )}
      </ul>
    </nav>
  </>
);

export default UserMenu;
