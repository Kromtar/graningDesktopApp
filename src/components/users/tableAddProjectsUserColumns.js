import React from 'react';

const filterStyle = {
  width: '100%',
  height: '25px',
  marginTop: '8px',
  marginBottom: '0px'
};

const columns = [{
  Header: 'Cod. Graning',
  maxWidth: 150,
  accessor: 'internalcode',
  Filter: ({filter, onChange}) => (
    <input
      onChange={event => onChange(event.target.value)}
      style={filterStyle}
    />
  )
},{
  Header: 'Nombre',
  accessor: 'name',
  Filter: ({filter, onChange}) => (
    <input
      onChange={event => onChange(event.target.value)}
      style={filterStyle}
    />
  )
},{
  Header: 'Nº Proyecto',
  accessor: 'proyectnumber',
  Filter: ({filter, onChange}) => (
    <input
      onChange={event => onChange(event.target.value)}
      style={filterStyle}
    />
  )
},{
  Header: 'Fecha de inicio',
  maxWidth: 120,
  id: 'openprojectdate',
  accessor: d => {
    if(d.openprojectdate){
      const mydate = new Date(d.openprojectdate);
      return mydate.toLocaleDateString('en-GB');
    }
    return 'Pendiente';
  },
  Filter: ({filter, onChange}) => (
    <input
      onChange={event => onChange(event.target.value)}
      style={filterStyle}
    />
  )
},{
  Header: "Finalizado",
  maxWidth: 100,
  accessor: "finished",
  id: "finished",
  Cell: ({ value }) => (value ? "Yes" : "No"),
  filterMethod: (filter, row) => {
    if (filter.value === "all") {
      return true;
    }
    if (filter.value === "true") {
      return row[filter.id];
    }
    return !row[filter.id];
  },
  Filter: ({ filter, onChange }) =>
    <div style={{paddingTop: '8px'}}>
      <select
        className="browser-default"
        style={{height: '37px'}}
        onChange={event => onChange(event.target.value)}
        value={filter ? filter.value : "all"}
      >
        <option value="all">Todos</option>
        <option value="true">Finalizado</option>
        <option value="false">Sin finalizar</option>
      </select>
    </div>
}]

export default columns;
