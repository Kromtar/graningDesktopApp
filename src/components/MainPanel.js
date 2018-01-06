//Marco navegacion secundario (requiere login)
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import * as actions from '../actions';

import Header from './Header';
import UsersList from './users/UsersList';
import ProjectsList from './projects/ProjectsList';

class MainPanel extends Component {

  componentDidMount(){
    this.props.fetchClients();
    this.props.fetchProjects();
  }

  render(){

      const onClick = (credentials) => {
        this.props.testCloseOk();
      }
      //TODO: Modificar las tabs por un meno con el diseño de materialize
      return(
          <Tabs>
            <TabList>
              <Tab>Clientes</Tab>
              <Tab>Proyectos</Tab>
            </TabList>

            <TabPanel>
              <UsersList />
            </TabPanel>
            <TabPanel>
              <ProjectsList />
            </TabPanel>

          </Tabs>
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
