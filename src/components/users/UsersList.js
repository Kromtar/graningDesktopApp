import React, { Component } from 'react';
import $ from 'jquery';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import NewUserContent from './NewUser';

import tableColumns from './tableColumns';

class UsersList extends Component {

  state = { showNewUser: false };

  componentDidMount(){
     $('#newUserModal').modal({
      dismissible: false,
      opacity: .5,
      inDuration: 300,
      outDuration: 200,
      ready: function(modal, trigger) {},
      complete: function() {}
    });
  }

  renderModalContent(){
    if(this.state.showNewUser){
      return (
        <div>
          <NewUserContent
            onUserSubmit={ (data) => {
              $('#newUserModal').modal('close');
              this.setState({ showNewUser: false });    //Para que el contenido del form se limpie
              this.props.createNewUser(data);
              this.props.fetchClients();
            }}
            onClose={() => {
              this.setState({ showNewUser: false });  //Para que el contenido del form se limpie
              $('#newUserModal').modal('close');
            }}
          />
        </div>
      );
    }
  }

  render() {

    const onClickReload = () => {
      this.props.fetchClients();
    }

    const data = this.props.clients;

    if(tableColumns.length === 3){
      tableColumns.pop();
    }
    if(tableColumns.length <= 3){
      tableColumns.push({
        Heder: 'Button',
        maxWidth: 120,
        accessor: '_id',
        sortable: false,
        filterable: false,
        Cell: row => (
          <a onClick={() => this.props.getClientDetail(row.value)} className="waves-effect waves-light btn"
            style={{
              color: '#fff',
              height: '25px',
              lineHeight: '26px',
              padding: '0 0.5rem',
              fontSize: 'small',
              backgroundColor: '#3399ff'
            }}>
            <i style={{marginLeft: '8px'}} className="material-icons right">visibility</i>
            Ver mas
          </a>
        )})
    }

    return (
      <div className="container" style={{ marginTop:  '30px'}}>

        {/* Titulo */}
        <div className="card">
          <div className="card-content white-text" style={{paddingBottom: '2px', paddingTop: '10px'}}>
            <span className="card-title">
              <i className="material-icons left">group</i>
              Lista de clientes
            </span>
          </div>
        </div>

        {/* Tabla */}
        <ReactTable
          data={data}
          columns={tableColumns}
          defaultPageSize = {12}
          pageSizeOptions = {[6, 12, 20, 30, 50, 100]}
          filterable
          noDataText="No hay datos :("
          className="-striped -highlight"
          previousText='Anterior'
          nextText= 'Próximo'
          loadingText= 'Cargando...'
          pageText= 'Página'
          ofText= 'de'
          rowsText= 'filas'
        />

        {/* Boton flotante */}
        <div className="fixed-action-btn">
          <a className="btn-floating btn-large" style={{backgroundColor: '#ff6600'}}>
            <i className="large material-icons">filter_list</i>
          </a>
          <ul>
            <li>
              <a onClick={ () => onClickReload()} className="btn-floating" style={{backgroundColor: '#0066cc'}}>
                <i className="material-icons">refresh</i>
              </a>
            </li>
            <li>
              <a onClick={() => this.setState({ showNewUser: true })} href="#newUserModal" className="btn-floating modal-trigger" style={{backgroundColor: '#2a6443'}}>
                <i className="material-icons">add</i>
              </a>
            </li>
          </ul>
        </div>

        {/* Modal */}
        <div id="newUserModal" className="modal" style={{top: '2% !important'}}>
          <div className="modal-content" style={{paddingBottom: '3px', paddingTop: '3px'}}>
            <h5 className="header" style={{marginBottom: '15px'}}>
              Añade un nuevo Cliente
            </h5>
            <div className="divider" style={{marginBottom: '4px'}}></div>
            {this.renderModalContent()}
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
