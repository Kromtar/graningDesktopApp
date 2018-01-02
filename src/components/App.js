import React, { Component } from 'react';

import { connect } from 'react-redux';
import * as actions from '../actions';

class App extends Component {

  componentDidMount(){
    this.props.test();
  }

  render(){
      return(
        <div>
          Holi
        </div>
      );
    }
};

export default connect(null, actions)(App);
