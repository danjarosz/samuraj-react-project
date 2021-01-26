import React, { useContext, useState } from "react";
import request from "../../../../helpers/request";
import { StoreContext } from "../../../../store/StoreProvider";
import CoursePopup from "./CoursePopup/CoursePopup";

const CourseDetails = (props) => {
  const { id, title } = props;
  const { setCourses } = useContext(StoreContext);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const showPopup = () => {
    setIsPopupOpen(true);
  };

  const hidePopup = (e) => {
    e.preventDefault();
    setIsPopupOpen(false);
  };

  const handleRemoveCourse = async () => {
    try {
      const { status } = await request.delete(`courses/${id}`);

      if (status === 200) {
        setCourses((prev) => prev.filter((course) => course.id !== id));
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <details>
      <summary>{title}</summary>
      <button onClick={showPopup}>Edytuj</button>
      <button onClick={handleRemoveCourse}>Usuń</button>
      <CoursePopup isPopupOpen={isPopupOpen} hidePopup={hidePopup} {...props} />
    </details>
  );
};

export default CourseDetails;
