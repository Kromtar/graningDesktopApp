//Marco global
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Landing from './Landing';

//TODO: Feedback de errores de internet/token expirada/error de token
//      Probar respuesta de la API e informar en caso de que sea incorrecta

class App extends Component {

  //Eventos de carga inicial de la React
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
