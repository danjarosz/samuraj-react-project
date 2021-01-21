import React from "react";
import bemCssModules from "bem-css-modules";
import { default as CourseStyles } from "./Course.module.scss";

const style = bemCssModules(CourseStyles);

const Course = ({ title, authors, price, img }) => {
  const allAuthors = authors.join(", ");

  return (
    <li>
      <article className={style()}>
        <h3 className={style("title")}>{title}</h3>
        <img className={style("image")} alt={title} src={img} />
        <p className={style("price")}>{`Kosz kursu: ${price}zł`}</p>
        <p className={style("authors")}>{`Autorzy kursu: ${allAuthors}`}</p>
      </article>
    </li>
  );
};

export default Course;
