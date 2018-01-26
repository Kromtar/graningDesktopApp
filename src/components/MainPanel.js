//Marco navegacion secundario (requiere login)
import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import * as actions from '../actions';

import ProjectsTab from './projects/ProjectsTab';
import ClientsTab from './users/ClientsTab';

class MainPanel extends Component {

  componentDidMount(){

    $(document).ready(function(){
      $('ul.tabs').tabs();
    });

    this.props.fetchClients();
    this.props.fetchProjects();
    this.props.getDrioboxKey();
  }

  onClickClients(){
    this.props.windowClientTabViewList();
  }

  onClickProyects(){
    this.props.windowProjectTabViewList();
  }

  render(){

      return(
        <div className="row">
          <div className="col s12" style={{paddingLeft: '0px', paddingRight: '0px'}}>
            <ul id="tabs" className="tabs z-depth-1">
              <li onClick={() => this.onClickClients()} className="tab col s2"><a className="active" href="#clients">Clientes</a></li>
              <li onClick={() => this.onClickProyects()} className="tab col s2"><a href="#projects">Proyectos</a></li>
            </ul>
          </div>
          <div id="clients" className="col s12"><ClientsTab /></div>
          <div id="projects" className="col s12"><ProjectsTab /></div>
        </div>
      );
    }
};

export default connect(null, actions)(MainPanel);
