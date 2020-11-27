import React, { useContext } from 'react';
import bemCssModules from "bem-css-modules";
import { default as HeaderStyles } from "./Header.module.scss"

import { StoreContext } from "../../store/StoreProvider";

const style = bemCssModules(HeaderStyles)

const Header = () => {
  const { user, setUser } = useContext(StoreContext);

  const setProperlyLabel = Boolean(user) ? "Wyloguj się" : "Zaloguj się";

  return (
    <header className={style()}>
      <div className={style('logo-wrapper')}/>
      <h1 className={style('title')}>Kursy dla programistów</h1>
      <button>{setProperlyLabel}</button>
    </header>
  )
}

export default Header;