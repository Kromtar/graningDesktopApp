import React from 'react';

const inputField = (props) => {

  const input = props.input;
  const label = props.label;
  const placeholder = props.placeholder;
  const autofocus = props.autoFocus;

  const error = props.meta.error;

  const isTouch = props.meta.touched;

  return (
    <div>
      <label>{label}</label>
      <div className="red-text">
        {isTouch && error}
      </div>
      <input {...input} autoFocus={autofocus ? true : false} placeholder={placeholder} style={{marginBottom: '5px'}}/>
    </div>
  );
};

export default inputField;
