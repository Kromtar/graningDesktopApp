import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import $ from 'jquery';

import ReactTable from 'react-table';

import tableAddProjectsUserColumns from './tableAddProjectsUserColumns';

class AddProjectToClient extends Component {
  render(){

    var filterProjects = [];
    //filtramos los projectos que ya tiene el usuario
    for(var keyA in this.props.projects){
        for(var keyB in this.props.clientDetailStatic._projects){
          if(this.props.projects[keyA]._id !== this.props.clientDetailStatic._projects[keyB]._id){
            filterProjects.push(this.props.projects[keyA]);
          }
        }
    }

    if(tableAddProjectsUserColumns.length <= 5){
      tableAddProjectsUserColumns.push({
        Heder: 'Button',
        maxWidth: 120,
        sortable: false,
        accessor: '_id',
        filterable: false,
        Cell: row => (
          <a onClick={() => {
            this.props.addProjectToClient({clientId: this.props.clientDetailStatic._id,projectId: row.value});
            //recarga
            $("#ProjectClienteRelationModal").modal('close');
          }} className="waves-effect waves-light btn" style={{ height: '25px', lineHeight: '26px', padding: '0 0.5rem', fontSize: 'small'}}>
            <i className="material-icons right">add</i>
            Agregar
          </a>
        )
      });
    }

    return(
      <div>

        {/* Tabla */}
        <ReactTable
          data={filterProjects}
          columns={tableAddProjectsUserColumns}
          defaultPageSize = {12}
          filterable
          noDataText="No hay datos :("
          className="-striped -highlight"
        />

        <div className="modal-footer">
          <div className="divider"></div>
          <div className="col s6">
            <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat">Cerrar</a>
          </div>
        </div>
      </div>
    );
  }
};

function mapStateToProps(state){
  return {
    projects: state.projects,
    clientDetailStatic: state.clientDetailStatic
  };
};

export default connect(mapStateToProps, actions)(AddProjectToClient);
