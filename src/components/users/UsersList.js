import React, { Component } from 'react';
import $ from 'jquery';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import NewUserContent from './NewUser';

class UsersList extends Component {

  componentDidMount(){
     $('.modal').modal({
      dismissible: false,
      opacity: .5,
      inDuration: 300,
      outDuration: 200,
      ready: function(modal, trigger) {},
      complete: function() {}
    });
  }

  render() {

    const onClickReload = () => {
      this.props.fetchClients();
    }

    const test = () => {
      this.props.test();
    }

    const data = this.props.clients;

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
    }, {
      Heder: 'Button',
      maxWidth: 120,
      sortable: false,
      filterable: false,
      Cell: row => (
        <a className="waves-effect waves-light btn" style={{ height: '25px', lineHeight: '26px', padding: '0 0.5rem', fontSize: 'small'}}>
          <i className="material-icons right">visibility</i>
          Ver mas
        </a>
      )
    }]

    return (
      <div className="container" style={{ marginTop:  '30px'}}>

        <div className="card blue-grey darken-1">
          <div className="card-content white-text" style={{paddingBottom: '2px', paddingTop: '10px'}}>
            <span className="card-title">Lista de clientes</span>
          </div>
        </div>

        <ReactTable
          data={data}
          columns={columns}
          defaultPageSize = {12}
          filterable
          noDataText="No hay datos :("
          className="-striped -highlight"
        />

        <div className="fixed-action-btn">
          <a className="btn-floating btn-large red">
            <i className="large material-icons">filter_list</i>
          </a>
          <ul>
            <li><a onClick={ () => onClickReload()} className="btn-floating blue"><i className="material-icons">refresh</i></a></li>
            <li><a href="#modal1" className="btn-floating green modal-trigger"><i className="material-icons">add</i></a></li>
          </ul>
        </div>

        <div id="modal1" className="modal modal-fixed-footer">
          <div className="modal-content">
            <h4>Añade un nuevo Cliente</h4>
            <NewUserContent />
          </div>
          <div className="modal-footer">
            <div className="col s6 left-align">
              <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat">Cerrar</a>
            </div>
            <div className="col s6 right-align">
              <a onClick={() => test()} className="waves-effect waves-green btn">Siguiente</a>
            </div>
          </div>
        </div>


      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    clients: state.clients
  };
};

export default connect(mapStateToProps, actions)(UsersList);
