import React from 'react';

const filterStyle = {
  width: '100%',
  height: '25px',
  marginTop: '8px',
  marginBottom: '0px'
};

const columns = [{
    Header: 'Cod Graning',
    accessor: 'internalcode',
    maxWidth: 100,
    Filter: ({filter, onChange}) => (
      <input
        onChange={event => onChange(event.target.value)}
        style={filterStyle}
      />
    )
  },{
    Header: 'Nombre',
    accessor: 'name', // String-based value accessors!
    Filter: ({filter, onChange}) => (
      <input
        onChange={event => onChange(event.target.value)}
        style={filterStyle}
      />
    )
  },{
    Header: 'Nº Proyecto',
    accessor: 'proyectnumber', // String-based value accessors!
    Filter: ({filter, onChange}) => (
      <input
        onChange={event => onChange(event.target.value)}
        style={filterStyle}
      />
    )
  },{
    Header: 'Fecha de inicio',
    maxWidth: 100,
    id: 'openprojectdate',
    accessor: d => {
      const mydate = new Date(d.openprojectdate);
      return mydate.toLocaleDateString('en-GB');
    },
    Filter: ({filter, onChange}) => (
      <input
        onChange={event => onChange(event.target.value)}
        style={filterStyle}
      />
    )
  },{
    Header: 'Estado',
    accessor: 'state', // String-based value accessors!
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
  },
  {
    Heder: 'Button',
    sortable: false,
    maxWidth: 120,
    filterable: false,
    Cell: row => (
      <a className="waves-effect waves-light btn" style={{ height: '25px', lineHeight: '26px', padding: '0 0.5rem', fontSize: 'small'}}>
        <i className="material-icons right">visibility</i>
        Ver mas
      </a>
    )
  }]

  export default columns;
