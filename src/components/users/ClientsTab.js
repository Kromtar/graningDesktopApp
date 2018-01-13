import React, { Component } from 'react';
import { connect } from 'react-redux';

import UsersList from './UsersList';
import ClientDetail from './ClientDetail';
import ClientEdit from './ClientEdit';

class ClientsTab extends Component {

  windowClientsDetailRender(){
    if(this.props.window_ClientTab === 'list'){
      return (
        <UsersList />
      );
    } else if (this.props.window_ClientTab === 'detail'){
      return (
        <ClientDetail />
      );
    } else if (this.props.window_ClientTab === 'edit'){
      return (
        <ClientEdit />
      );
    }
  }

  render(){
      return(
        <div>
          {this.windowClientsDetailRender()}
        </div>
      );
    }
  };

  function mapStateToProps(state){
    return {
      window_ClientTab: state.window_ClientTab
    };
  };

export default connect(mapStateToProps)(ClientsTab);
