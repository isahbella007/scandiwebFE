import React, { useState } from "react";
import "./FormInput.css";

const FormInput = (props) => {
  const [clickedOn, setClickedOn] = useState(false);
  const { label, transform, onChange, ...inputs } = props;

  const handleOnClicked = (e) => {
    setClickedOn(true);
  };
  return (
    <div className="formInput">
      <div className="form-header-text">
        <label>{label}</label>
        <p className="form-text">*</p>
      </div>

      <input
        {...inputs}
        onKeyUp={transform}
        onChange={onChange}
        onBlur={handleOnClicked}
        focused={clickedOn.toString()}
      ></input>
      <span>{inputs.errormessage}</span>
      <br></br>
    </div>
  );
};
export default FormInput;
