import React, { forwardRef } from "react";
import style from "../assets/styles/CustomCheckBox.module.scss";

const CustomCheckBox = forwardRef((props, ref) => {
  const { title, id, form } = props;
  return (
    <label
      className={`${style.label} ${form === "true" && style.form_field}`}
      htmlFor={id}
    >
      <input type="checkbox" {...props} ref={ref} />
      <span className={style.circle} />
      {title && <span className={style.title}>{title}</span>}
    </label>
  );
});

export default CustomCheckBox;
