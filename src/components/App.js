import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actions from '../actions';

import Landing from './Landing';

class App extends Component {

  componentDidMount(){
    //this.props.test();
  }

  render(){
      return(
        <div>
          <BrowserRouter>
            <div className="container" style={{width: '95%'}} >
              <Route exact={true} path="/" component={Landing} />
            </div>
          </BrowserRouter>
        </div>
      );
    }
};

export default connect(null, actions)(App);
