import React, { useState } from "react";
import s from "./OptionsGrid.module.css";

const OptionsGrid = ({ content, selectOptions }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const clickOptionHandler = (i) => {
    setSelectedImage(i);
    selectOptions(i);
  };

  return (
    <>
      {content?.map((ele, i) => (
        <div
          key={i}
          className={`${s.imageItem} ${selectedImage === i ? s.selected : ""}`}
          onClick={() => clickOptionHandler(i)}
          style={{ padding: ele.text ? "15px" : "0px" }}
        >
          {ele.text && <span className={s.text}>{ele.text}</span>}
          {ele.ImageUrl && (
            <img
              src={ele.ImageUrl}
              className={s.imageUrl}
              alt={`Sample ${i}`}
            />
          )}
        </div>
      ))}
    </>
  );
};

export default OptionsGrid;
