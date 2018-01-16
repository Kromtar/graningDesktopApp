import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import $ from 'jquery';

import ReactTable from 'react-table';
import tableAddProjectsUserColumns from './tableAddProjectsUserColumns';

class AddProjectToClient extends Component {
  render(){

    var filterProjects = [];

    //filtramos los projectos que ya tiene el usuario, si es que tiene
    if(this.props.clientDetailStatic._projects.length > 0){
      for(var keyA in this.props.projects){
        var clientHasProject = false;
        for(var keyB in this.props.clientDetailStatic._projects){
          if(this.props.projects[keyA]._id === this.props.clientDetailStatic._projects[keyB]._id){
            clientHasProject = true;
          }
        }
        if(!clientHasProject){
          filterProjects.push(this.props.projects[keyA]);
        }
      }
    }else{
      filterProjects = this.props.projects;
    }

    if(tableAddProjectsUserColumns.length === 5){
      tableAddProjectsUserColumns.pop();
    }
    if(tableAddProjectsUserColumns.length <= 5){
      tableAddProjectsUserColumns.push({
        Heder: 'Button',
        maxWidth: 120,
        sortable: false,
        accessor: '_id',
        filterable: false,
        Cell: row => (
          <a
            onClick={async () => {
              await this.props.addProjectToClient({clientId: this.props.clientDetailStatic._id,projectId: row.value});
              await this.props.getClientDetail(this.props.clientDetailStatic._id);
              this.props.onClose();
            }}
            className="waves-effect waves-light btn"
            style={{ height: '25px', lineHeight: '26px', padding: '0 0.5rem', fontSize: 'small', backgroundColor: '#2a6443'}}
          >
            <i style={{marginLeft: '8px'}} className="material-icons right">create_new_folder</i>
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

        <div className="modal-footer">
          <div className="divider"></div>
          <div className="col s6">
            <a
              onClick={() => this.props.onClose()}
              className="modal-action modal-close waves-effect waves-green btn-flat">
              Cerrar
            </a>
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
