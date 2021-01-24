import React, { useContext } from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import bemCssModules from "bem-css-modules";
import { StoreContext } from "../../store/StoreProvider";
import { default as ContentStyles } from "./Content.module.scss";
import Courses from "../Courses/Courses";
import UserCourses from "../UserCourses/UserCourses";
import AdminPanel from "../AdminPanel/AdminPanel";

const style = bemCssModules(ContentStyles);

const ADMIN_TYPE = 1;

const Content = () => {
  const { user } = useContext(StoreContext);

  const isUserLogged = Boolean(user);
  const isAdmin = user?.accessLevel === ADMIN_TYPE;

  return (
    <main className={style()}>
      <Switch>
        <Route exact path="/" render={() => <Courses />} />
        {isUserLogged && (
          <Route exact path="/my-courses" render={() => <UserCourses />} />
        )}
        {isAdmin && (
          <Route exact path="/manage-courses" render={() => <AdminPanel />} />
        )}
        <Redirect to="/" />
      </Switch>
    </main>
  );
};

export default Content;
