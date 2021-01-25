import React, { useContext, useState } from "react";
import bemCssModules from "bem-css-modules";
import { StoreContext } from "../../../../../store/StoreProvider";
import Modal from "../../../../Modal/Modal";

import { default as CoursePopupStyles } from "./CoursePopup.module.scss";
const style = bemCssModules(CoursePopupStyles);

const CoursePopup = ({
  authors = [],
  id,
  img = "",
  price = 0,
  title = "",
  hidePopup,
  isEditMode = true,
  isPopupOpen,
}) => {
  const [formAuthors, setFormAuthors] = useState(authors);
  const [formAuthor, seFormAuthor] = useState("");
  const [formImg, setFormImg] = useState(img);
  const [formPrice, setFormPrice] = useState(price);
  const [formTitle, setFormTitle] = useState(title);

  const { setCourses } = useContext(StoreContext);

  const handleOnChange = (e, fn) => {
    const { value } = e.target;
    fn(value);
  };

  return (
    <Modal handleOnClose={hidePopup} isOpen={isPopupOpen}>
      <div className={style()}>
        <form className={style("form")} method="submit">
          <div className={style("form-row")}>
            <label>
              <span>Autor</span>
              <input
                type="text"
                value={formAuthor}
                onChange={(e) => handleOnChange(e, setFormAuthor)}
              />
              <button>Dodaj autora</button>
            </label>
          </div>
          <div className={style("form-row")}>
            <label>
              <span>Obrazek</span>
              <input
                type="text"
                value={formImg}
                onChange={(e) => handleOnChange(e, setFormImg)}
              />
            </label>
          </div>
          <div className={style("form-row")}>
            <label>
              <span>Cena</span>
              <input
                type="number"
                value={formPrice}
                onChange={(e) => handleOnChange(e, setFormPrice)}
              />
            </label>
          </div>
          <div className={style("form-row")}>
            <label>
              <span>Tytuł</span>
              <input
                type="text"
                value={formTitle}
                onChange={(e) => handleOnChange(e, setFormTitle)}
              />
            </label>
          </div>
          <button type="submit"></button>
          <button type="button" onClick={hidePopup}>
            Anuluj
          </button>
        </form>
        <p>Lista autorów</p>
        <ul></ul>
      </div>
    </Modal>
  );
};

export default CoursePopup;
