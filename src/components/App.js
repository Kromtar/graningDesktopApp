import React, { Component } from 'react';

import { connect } from 'react-redux';
import * as actions from '../actions';

import Landing from './Landing';

class App extends Component {

  componentDidMount(){
    this.props.checkApiUrl();

    this.props.checkToken();
  }

  render(){
      return(
        <div>
          <Landing />
        </div>
      );
    }
};

export default connect(null, actions)(App);
