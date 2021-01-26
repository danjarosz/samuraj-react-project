import React, { useState, useContext } from "react";
import { StoreContext } from "../../store/StoreProvider";
import CourseDetails from "./components/CourseDetails/CourseDetails";
import CoursePopup from "./components/CourseDetails/CoursePopup/CoursePopup";

const AdminPanel = () => {
  const { courses } = useContext(StoreContext);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const showPopup = () => {
    setIsPopupOpen(true);
  };

  const hidePopup = (e) => {
    e.preventDefault();
    setIsPopupOpen(false);
  };

  const coursesElements = courses.map((course) => (
    <CourseDetails key={course.id} {...course} />
  ));

  return (
    <section>
      {coursesElements}
      <button onClick={showPopup}>Dodaj nowy kurs</button>
      <CoursePopup
        isPopupOpen={isPopupOpen}
        hidePopup={hidePopup}
        isEditMode={false}
      />
    </section>
  );
};

export default AdminPanel;
