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
              console.log(data);
              this.props.createNewProject(data);
              $('#newProjectModal').modal('close');
              this.setState({ showNewProject: false });    //Para que el contenido del form se limpie
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

      return(
        <div className="container" style={{ marginTop:  '30px'}}>

          {/* Titulo */}
          <div className="card blue-grey darken-1">
            <div className="card-content white-text" style={{paddingBottom: '2px', paddingTop: '10px'}}>
              <span className="card-title">Lista de proyectos</span>
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
                <a onClick={() => this.setState({ showNewProject: true })} href="#newProjectModal" className="btn-floating green modal-trigger">
                  <i className="material-icons">add</i>
                </a>
              </li>
            </ul>
          </div>

          {/* Modal */}
          <div id="newProjectModal" className="modal" style={{top: '2% !important'}}>
            <div className="modal-content" style={{paddingBottom: '3px'}}>
              <h4 className="header">Añade un nuevo Proyecto</h4>
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
