import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

const datePicker = (props) => {

  const input = props.input;
  const label = props.label;
  const placeholder = props.placeholder;

  console.log(input.value);

  const value = typeof(input.value) === "string" ? input.value : moment(input.value).format('DD-MM-YYYY');

  return (
    <div>
      <label><b>{label}</b></label>
      <DatePicker
        {...input}
        dateFormat="DD-MM-YYYY"
        selected={value ? moment(value, 'DD-MM-YYYY') : null}
        todayButton={"Hoy"}
        isClearable={true}
        showYearDropdown
        scrollableYearDropdown
        yearDropdownItemNumber={3}
      />
    </div>
  );

};

export default datePicker;
