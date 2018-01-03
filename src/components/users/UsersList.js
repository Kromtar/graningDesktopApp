import React, { Component } from 'react';
import { connect } from 'react-redux';

class UserList extends Component {

  render(){
      return(
        <div className="container" style={{ marginTop:  '30px'}}>
          Aqui va la lista de usuarios
        </div>
      );
    }
};

export default connect(null)(UserList);
