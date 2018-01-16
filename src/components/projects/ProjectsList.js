import React, { Component } from 'react';
import $ from 'jquery';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import * as actions from '../../actions';

import NewProjectContent from './NewProject';

import tableColumns from './tableColumns';

class ProjectsList extends Component {

  state = { showNewProject: false };

  componentDidMount(){
     $('#newProjectModal').modal({
      dismissible: false,
      opacity: .5,
      inDuration: 300,
      outDuration: 200,
      ready: function(modal, trigger) {},
      complete: function() {}
    });
  }

  renderModalContent(){
    if(this.state.showNewProject){
      return (
        <div>
          <NewProjectContent
            onProjectSubmit={ (data) => {
              this.props.createNewProject(data).then(() => {
                this.props.fetchProjects();
              });
              $('#newProjectModal').modal('close');
              this.setState({ showNewProject: false });    //Para que el contenido del form se limpie
              this.forceUpdate();
            }}
            onClose={() => {
              this.setState({ showNewProject: false });  //Para que el contenido del form se limpie
              $('#newProjectModal').modal('close');
            }}
          />
        </div>
      );
    }
  }

  render(){

      const onClickReload = () => {
        this.props.fetchProjects();
      }

      const data = this.props.projects;

      //Agrega la columna del boton que requiere activar una acction
      //Tenemos una condicion de tamañano, porque el render se ejecuta 2 veces al inicio y se generan 2 botones
      if(tableColumns.length <= 6){
        tableColumns.push({
          Heder: 'Button',
          maxWidth: 120,
          sortable: false,
          accessor: '_id',
          filterable: false,
          Cell: row => (
            <a onClick={() => this.props.getProjectDetail(row.value)} className="waves-effect waves-light btn"
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
          )
        });
      }

      return(
        <div className="container" style={{ marginTop:  '30px'}}>

          {/* Titulo */}
          <div className="card">
            <div className="card-content white-text" style={{paddingBottom: '2px', paddingTop: '10px'}}>
              <span className="card-title">
                <i className="material-icons left">library_books</i>
                Lista de proyectos
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
                <a onClick={() => this.setState({ showNewProject: true })} href="#newProjectModal" className="btn-floating modal-trigger" style={{backgroundColor: '#2a6443'}}>
                  <i className="material-icons">add</i>
                </a>
              </li>
            </ul>
          </div>

          {/* Modal */}
          <div id="newProjectModal" className="modal" style={{top: '2% !important'}}>
            <div className="modal-content" style={{paddingBottom: '3px'}}>
              <h5 className="header" style={{marginBottom: '15px'}}>Añade un nuevo Proyecto</h5>
              {this.renderModalContent()}
            </div>
          </div>

        </div>
      );
    }
};

function mapStateToProps(state){
  return {
    projects: state.projects
  };
};

export default connect(mapStateToProps, actions)(ProjectsList);
