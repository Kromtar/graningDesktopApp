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
              //REFRESH
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

    return (
      <div className="container" style={{ marginTop:  '30px'}}>

        {/* Titulo */}
        <div className="card blue-grey darken-1">
          <div className="card-content white-text" style={{paddingBottom: '2px', paddingTop: '10px'}}>
            <span className="card-title">Lista de clientes</span>
          </div>
        </div>

        {/* Tabla */}
        <ReactTable
          data={data}
          columns={tableColumns}
          defaultPageSize = {12}
          filterable
          noDataText="No hay datos :("
          className="-striped -highlight"
        />

        {/* Boton flotante */}
        <div className="fixed-action-btn">
          <a className="btn-floating btn-large red">
            <i className="large material-icons">filter_list</i>
          </a>
          <ul>
            <li>
              <a onClick={ () => onClickReload()} className="btn-floating blue">
                <i className="material-icons">refresh</i>
              </a>
            </li>
            <li>
              <a onClick={() => this.setState({ showNewUser: true })} href="#newUserModal" className="btn-floating green modal-trigger">
                <i className="material-icons">add</i>
              </a>
            </li>
          </ul>
        </div>

        {/* Modal */}
        <div id="newUserModal" className="modal" style={{top: '2% !important'}}>
          <div className="modal-content" style={{paddingBottom: '3px'}}>
            <h4 className="header">Añade un nuevo Cliente</h4>
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
