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
          <a
            onClick={async () => {
              await this.props.getProjectDetail(row.value);
              $('ul.tabs').tabs('select_tab', 'projects');
            }}
            className="waves-effect waves-light btn"
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
            }} className="waves-effect waves-light btn" style={{ height: '25px', lineHeight: '26px', padding: '0 0.5rem', fontSize: 'small', backgroundColor: '#ff6600'}}>
            <i style={{marginLeft: '8px'}} className="material-icons right">remove_circle_outline</i>
            Remover acceso
          </a>
        )}
      )
    }

    return(
      <div>

        {/* Cuerpo con footer fijo */}
        <div style={{display: 'flex', minHeight: '91vh', flexDirection: 'column'}}>
          <main className="container" style={{flex: '1 1 auto', marginTop: '22px'}}>

            {/* Titulo */}
            <div className="card">
              <div
                className="card-content white-text"
                style={{ paddingBottom: '2px', paddingTop: '10px' }}
              >
                <span className="card-title">
                  <i className="material-icons left">person</i>
                  Detalles del Cliente: {this.props.clientDetailStatic.name} {this.props.clientDetailStatic.surname}
                </span>
              </div>
            </div>

            {/* Contenido con scroll fijo */}
            <div style={{overflow: 'auto', maxHeight: '68vh'}}>

              {/* Informacion general de un cliente */}
              <div
                className="row z-depth-3"
                style={{
                  marginLeft: '10px',
                  marginRight: '10px',
                  borderColor: '#00305b',
                  borderRadius: '12px',
                  borderWidth: '1px',
                  borderStyle: 'solid'
                }}
              >
                <div className="col s6">
                  <p><b>Nombre:  </b>{this.props.clientDetailStatic.name}</p>
                  <p><b>Apellido:  </b>{this.props.clientDetailStatic.surname}</p>
                  <p><b>Compañía:  </b>{this.props.clientDetailStatic.company}</p>
                  <p><b>Departamento:  </b>{this.props.clientDetailStatic.department}</p>
                  <p><b>Puesto de trabajo:  </b>{this.props.clientDetailStatic.workstation}</p>
                </div>
                <div className="col s6">
                  <p><b>Email:  </b>{this.props.clientDetailStatic.email}</p>
                  <p><b>Teléfono 1:  </b>{this.props.clientDetailStatic.phone1}</p>
                  <p><b>Teléfono 2:  </b>{this.props.clientDetailStatic.phone2}</p>
                  <p><b>Dirección:  </b>{this.props.clientDetailStatic.address}</p>
                </div>
              </div>

              {/* Projectos de un cliente */}
              <div className="row z-depth-1"
                style={{
                  marginLeft: '10px',
                  marginRight: '10px',
                  borderColor: '#00305b',
                  borderRadius: '12px',
                  borderWidth: '1px',
                  borderStyle: 'solid'
                }}>
                <div className="col s12">
                  <div className="row" style={{marginBottom: '5px'}}>
                    <div className="col s6">
                      <p style={{ marginBottom: '10px', marginTop: '20px'}}>
                        <b>Proyectos visibles para este cliente:</b>
                      </p>
                    </div>
                    <div className="col s6 right-align">
                      <a
                        onClick={() => $("#ProjectClienteRelationModal").modal('open')}
                        className="waves-effect waves-light btn"
                        style={{
                          marginTop: '10px',
                          backgroundColor: '#2a6443'
                        }}
                      >
                        <i className="material-icons right">folder_shared</i>
                        Incribir en proyecto
                      </a>
                    </div>
                  </div>
                  <div className="divider" style={{marginBottom: '5px'}}></div>

                  {/* Tabla de proyectos de un cliente */}
                  <ReactTable
                    data = {data}
                    columns={tableProjectsUserColumns}
                    defaultPageSize = {6}
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
                </div>
              </div>
            </div>

            {/* Modal para asignar un nuevo proyecto a un cliente */}
            <div id="ProjectClienteRelationModal" className="modal" style={{top: '2% !important'}}>
              <div className="modal-content" style={{paddingBottom: '3px', paddingTop: '3px'}}>
                <h5 className="header" style={{marginBottom: '15px'}}>
                  Inscribe a {this.props.clientDetailStatic.name} {this.props.clientDetailStatic.surname} en un proyecto
                </h5>
                <div className="divider" style={{marginBottom: '4px'}}></div>
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
            rightLabel='Editar informacion del cliente'
            rightIcon='edit'
            rightColor='#3399ff'
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
