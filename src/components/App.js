import React, { Component } from 'react';

import { connect } from 'react-redux';
import * as actions from '../actions';

import Landing from './Landing';

const renderHomeRoute = () => {
  if (window.location.pathname.includes('index.html')) {
     return true;
  } else return false;
};

class App extends Component {

  componentDidMount(){
    //this.props.test();
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
