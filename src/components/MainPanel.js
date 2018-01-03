import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';

class MainPanel extends Component {

  render(){

      const onClick = (credentials) => {
        this.props.testCloseOk();
      }

      return(
        <div>
          <Header />
          <button onClick={onClick}>
            Send Autorizate Request to API
          </button>
        </div>
      );
    }
};

export default connect(null, actions)(MainPanel);
