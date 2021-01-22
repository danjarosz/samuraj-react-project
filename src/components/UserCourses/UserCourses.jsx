import React, { useContext } from "react";
import { StoreContext } from "../../store/StoreProvider";
import bemCssModules from "bem-css-modules";
import { default as UserCoursesStyles } from "./UserCourses.module.scss";
import Course from "../Course/Course";

const style = bemCssModules(UserCoursesStyles);

const UserCourses = () => {
  const { user, courses } = useContext(StoreContext);
  const boughtCourses = courses.filter((course) =>
    user.courses.includes(course.id)
  );

  const coursesElements = boughtCourses.map((course) => (
    <Course key={course.id} {...course} />
  ));

  return (
    <section className={style()}>
      <h2 className={style("title")}>Twoje wykupione kursy</h2>
      <ul className={style("list")}>{coursesElements}</ul>
    </section>
  );
};

export default UserCourses;
