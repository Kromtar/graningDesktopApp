//Marco navegacion secundario (requiere login)
import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import * as actions from '../actions';

import UsersList from './users/UsersList';
import ProjectsList from './projects/ProjectsList';

class MainPanel extends Component {

  componentDidMount(){

    $(document).ready(function(){
      $('ul.tabs').tabs();
    });

    this.props.fetchClients();
    this.props.fetchProjects();
  }

  render(){

      const onClick = (credentials) => {
        this.props.testCloseOk();
      }

      return(
        <div className="row">
          <div className="col s12" style={{paddingLeft: '0px', paddingRight: '0px'}}>
            <ul className="tabs z-depth-1">
              <li className="tab col s2"><a className="active" href="#clients">Clientes</a></li>
              <li className="tab col s2"><a href="#projects">Proyectos</a></li>
            </ul>
          </div>
          <div id="clients" className="col s12"><UsersList /></div>
          <div id="projects" className="col s12"><ProjectsList /></div>
        </div>
      );
    }
};

function mapStateToProps(state){
  return {
     clients: state.clients,
     projects: state.projects
  };
};

export default connect(null, actions)(MainPanel);
