//Marco navegacion secundario (requiere login)
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import * as actions from '../actions';

import Header from './Header';
import UserList from './users/UsersList';

class MainPanel extends Component {

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
              <UserList />
            </TabPanel>
            <TabPanel>
              <h2>Aqui va la lista de proyectos</h2>
            </TabPanel>

          </Tabs>
      );
    }
};

export default connect(null, actions)(MainPanel);
