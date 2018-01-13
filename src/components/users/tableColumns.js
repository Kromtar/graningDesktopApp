import React from 'react';

const filterStyle = {
  width: '100%',
  height: '25px',
  marginTop: '8px',
  marginBottom: '0px'
};

const columns = [{
  Header: 'Empresa',
  maxWidth: 150,
  accessor: 'company', // String-based value accessors!
  Filter: ({filter, onChange}) => (
    <input
      onChange={event => onChange(event.target.value)}
      style={filterStyle}
    />
  )
}, {
  Header: 'Nombre',
  id: 'name',
  accessor: d => d.name + ' ' + d.surname,
  Filter: ({filter, onChange}) => (
    <input
      onChange={event => onChange(event.target.value)}
      style={filterStyle}
    />
  )
}, {
  Header: 'Mail', // Required because our accessor is not a string
  accessor: 'email',
  Filter: ({filter, onChange}) => (
    <input
      onChange={event => onChange(event.target.value)}
      style={filterStyle}
    />
  )
}]

export default columns;
