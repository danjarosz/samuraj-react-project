import React, { useContext, useState } from "react";
import bemCssModules from "bem-css-modules";
import { StoreContext } from "../../../../../store/StoreProvider";
import Modal from "../../../../Modal/Modal";

import { default as CoursePopupStyles } from "./CoursePopup.module.scss";
import request from "../../../../../helpers/request";
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
  const [formAuthor, setFormAuthor] = useState("");
  const [formImg, setFormImg] = useState(img);
  const [formPrice, setFormPrice] = useState(price);
  const [formTitle, setFormTitle] = useState(title);

  const { setCourses } = useContext(StoreContext);

  const handleOnChange = (e, fn) => {
    const { value } = e.target;
    fn(value);
  };

  const addAuthor = (e) => {
    e.preventDefault();

    setFormAuthors((prev) => [...prev, formAuthor]);
    setFormAuthor("");
  };

  const deleteAuthor = (e) => {
    const authorToDelete = e.target.dataset.author;
    setFormAuthors((prev) =>
      prev.filter((author) => author !== authorToDelete)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const courseObject = {
      authors: formAuthors,
      img: formImg,
      title: formTitle,
      price: Number(formPrice),
    };

    if (isEditMode) {
      courseObject.id = id;

      const { data, status } = await request.put("/courses", courseObject);

      if (status === 202) {
        setCourses(data.courses);
      }
    } else {
      const { data, status } = await request.post("/courses", courseObject);

      if (status === 201) {
        setCourses(data.courses);
      }
    }

    hidePopup(e);
  };

  const authorsElements = formAuthors.map((author) => (
    <li key={author}>
      <p>{author}</p>
      <button data-author={author} onClick={deleteAuthor}>
        Usuń
      </button>
    </li>
  ));

  const correctLabel = isEditMode ? "Aktualizuj kurs" : "Utwórz kurs";

  return (
    <Modal handleOnClose={hidePopup} isOpen={isPopupOpen}>
      <div className={style()}>
        <form className={style("form")} method="submit" onSubmit={handleSubmit}>
          <div className={style("form-row")}>
            <label>
              <span>Autor</span>
              <input
                type="text"
                value={formAuthor}
                onChange={(e) => handleOnChange(e, setFormAuthor)}
              />
              <button onClick={addAuthor}>Dodaj autora</button>
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
          <button type="submit">{correctLabel}</button>
          <button type="button" onClick={hidePopup}>
            Anuluj
          </button>
        </form>
        <p>Lista autorów</p>
        <ul>{authorsElements}</ul>
      </div>
    </Modal>
  );
};

export default CoursePopup;
