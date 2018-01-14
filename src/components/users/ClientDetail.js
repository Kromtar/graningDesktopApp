import _ from 'lodash';
import React, { Component } from 'react';
import ReactTable from 'react-table';
import $ from 'jquery';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import tableProjectsUserColumns from './tableProjectsUserColumns';
import AddProjectToClient from './AddProjectToClient';

import RemoveProjectFromClientModal from './subComponents/removeProjectFromClientModal';
import FooterNavigator from '../aux/footerNavigator';

class ClientDetail extends Component {

  state ={
    projectSelectedForRemove: {
      id: null,
      name: null,
      internalcode: null
    }
  }

  componentDidMount(){
    $('#ProjectClienteRelationModal').modal({
     dismissible: false,
     opacity: .5,
     inDuration: 300,
     outDuration: 200,
     ready: function(modal, trigger) {},
     complete: function() {}
   });

   $('#removeProjectFromUserModal').modal({
    opacity: .5,
    inDuration: 300,
    outDuration: 200,
    ready: function(modal, trigger) {},
    complete: function() {}
  });

  }

  dateFormat(dateIn){
    const mydate = new Date(dateIn);
    return mydate.toLocaleDateString('en-GB');
  }

  render(){

    const data = this.props.clientDetailStatic._projects;

    //TODO: Buscar forma de actualizar los botones de otro modo
    //Quitamos los ultimos botones (para actualizarlos ya que dependen del state del componente)
    if(tableProjectsUserColumns.length === 6){
      tableProjectsUserColumns.pop();
      tableProjectsUserColumns.pop();
    }
    //Añade los botones de acciones a la tabla de lista de proyectos de un cliente
    if(tableProjectsUserColumns.length < 5){
      tableProjectsUserColumns.push({
        Heder: 'Button',
        maxWidth: 120,
        accessor: '_id',
        sortable: false,
        filterable: false,
        Cell: row => (
          <a onClick={() => console.log('ver mas del proyecto')} className="waves-effect waves-light btn" style={{ height: '25px', lineHeight: '26px', padding: '0 0.5rem', fontSize: 'small'}}>
            <i className="material-icons right">extension</i>
            Ver mas
          </a>
        )},
        {
        Heder: 'ButtonDel',
        maxWidth: 200,
        accessor: '_id',
        sortable: false,
        filterable: false,
        Cell: row => (
          <a onClick={() =>{
              this.setState({projectSelectedForRemove: {id: row.value, name: row.row.name, internalcode: row.row.internalcode}});
              $("#removeProjectFromUserModal").modal('open');
            }} className="waves-effect waves-light btn" style={{ height: '25px', lineHeight: '26px', padding: '0 0.5rem', fontSize: 'small'}}>
            <i className="material-icons right">redo</i>
            Remover acceso
          </a>
        )}
      )
    }

    return(
      <div>

        {/* Cuerpo con footer fijo */}
        <div style={{display: 'flex', minHeight: '91vh', flexDirection: 'column'}}>
          <main className="container" style={{flex: '1 1 auto', marginTop: '23px'}}>

            {/* Titulo */}
            <div className="card blue-grey darken-1">
              <div className="card-content white-text" style={{paddingBottom: '2px', paddingTop: '10px'}}>
                <span className="card-title">
                  Detalles del Cliente: {this.props.clientDetailStatic.name} {this.props.clientDetailStatic.surname}
                </span>
              </div>
            </div>

            {/* Contenido con scroll fijo */}
            <div style={{overflow: 'auto', maxHeight: '68vh'}}>

              {/* Informacion general de un cliente */}
              <div className="row z-depth-1" style={{marginLeft: '10px', marginRight: '10px'}}>
                <div className="col s6">
                  <p><b>Nombre:  </b>{this.props.clientDetailStatic.name}</p>
                  <p><b>Apellido:  </b>{this.props.clientDetailStatic.surname}</p>
                  <p><b>Compañia:  </b>{this.props.clientDetailStatic.company}</p>
                  <p><b>Departamento:  </b>{this.props.clientDetailStatic.department}</p>
                  <p><b>Puesto de trabajo:  </b>{this.props.clientDetailStatic.workstation}</p>
                </div>
                <div className="col s6">
                  <p><b>Email:  </b>{this.props.clientDetailStatic.email}</p>
                  <p><b>Telefono 1:  </b>{this.props.clientDetailStatic.phone1}</p>
                  <p><b>Telefono 2:  </b>{this.props.clientDetailStatic.phone2}</p>
                  <p><b>Direccion:  </b>{this.props.clientDetailStatic.address}</p>
                </div>
              </div>

              {/* Projectos de un cliente */}
              <div className="row z-depth-1" style={{marginLeft: '10px', marginRight: '10px'}}>
                <div className="col s12">
                  <div className="row">
                    <div className="col s6">
                      <p><b>Proyectos del Cliente:</b></p>
                    </div>
                    <div className="col s6 right-align">
                      <a onClick={() => $("#ProjectClienteRelationModal").modal('open')} className="waves-effect waves-light btn" style={{marginTop: '10px'}}><i className="material-icons right">note_add</i>Añade un proyecto a este cliente</a>
                    </div>
                  </div>
                  <div className="divider" style={{marginBottom: '5px'}}></div>

                  {/* Tabla de proyectos de un cliente */}
                  <ReactTable
                    data = {data}
                    columns={tableProjectsUserColumns}
                    defaultPageSize = {8}
                    filterable
                    noDataText="No hay datos :("
                    className="-striped -highlight"
                  />

                </div>
              </div>
            </div>

            {/* Modal para asignar un nuevo proyecto a un cliente */}
            <div id="ProjectClienteRelationModal" className="modal" style={{top: '2% !important'}}>
              <div className="modal-content" style={{paddingBottom: '3px'}}>
                <h5 className="header">Agrega un proyecto para este Cliente</h5>
                <AddProjectToClient
                  onClose={() => $("#ProjectClienteRelationModal").modal('close')}
                />
              </div>
            </div>

            {/* Modal para confirmar remover un proyecto de un cliente*/}
            <div id="removeProjectFromUserModal" className="modal" style={{top: '2% !important'}}>
              <RemoveProjectFromClientModal
                name={this.props.clientDetailStatic.name}
                surname={this.props.clientDetailStatic.surname}
                projectName={this.state.projectSelectedForRemove.name}
                projectInternalcode={this.state.projectSelectedForRemove.internalcode}
                onClose={() => $("#removeProjectFromUserModal").modal('close')}
                onConfirm={async () => {
                  await this.props.removeProjectToClient(this.props.clientDetailStatic._id ,this.state.projectSelectedForRemove.id);
                  await this.props.getClientDetail(this.props.clientDetailStatic._id);
                  $("#removeProjectFromUserModal").modal('close');
                }}
              />
            </div>

          </main>

          {/* Barra de navegacion inferior */}
          <FooterNavigator
            leftLabel='Cerrar'
            rightLabel='Editar informacion del Usuario'
            rightIcon='mode_edit'
            rightColor='orange'
            onLeftBtn={() => this.props.windowClientTabViewList()}
            onRightBtn={() => this.props.windowClientTabViewEdit()}
          />

        </div>
      </div>
    );
  }
};

function mapStateToProps(state){
  return {
    clientDetailStatic: state.clientDetailStatic
  };
};

export default connect(mapStateToProps, actions)(ClientDetail);