import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

const datePicker = (props) => {

  const input = props.input;
  const label = props.label;

  return (
    <div>
      <label><b>{label}</b></label>
      <DatePicker
        {...input}
        dateFormat="DD-MM-YYYY"
        selected={input.value ? moment(input.value, 'DD-MM-YYYY') : null}
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
