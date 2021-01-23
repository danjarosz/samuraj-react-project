import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import bemCssModules from "bem-css-modules";
import { default as CourseStyles } from "./Course.module.scss";
import request from "../../helpers/request";
import { StoreContext } from "../../store/StoreProvider";

const style = bemCssModules(CourseStyles);

const Course = ({ isUserContext, id, title, authors, price, img }) => {
  const { user, setUser } = useContext(StoreContext);
  const history = useHistory();

  const isUserLogged = Boolean(user);

  const allAuthors = authors.join(", ");

  const handleOnClick = async () => {
    try {
      const { data, status } = await request.patch("/users", {
        login: user.login,
        courseId: id,
      });

      if (status === 202) {
        setUser(data.user);
        history.push("/my-courses");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const displayBuyButton = !isUserContext && isUserLogged;

  return (
    <li>
      <article className={style()}>
        <h3 className={style("title")}>{title}</h3>
        <img className={style("image")} alt={title} src={img} />
        <p className={style("price")}>{`Kosz kursu: ${price}zł`}</p>
        <p className={style("authors")}>{`Autorzy kursu: ${allAuthors}`}</p>
        {displayBuyButton && (
          <button onClick={handleOnClick}>Zakup ten kurs</button>
        )}
      </article>
    </li>
  );
};

export default Course;
