//From de login
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
//TODO: Aislar acntions no relacionadas del import
import * as actions from '../actions';


class LoginForm extends Component {

  render(){

    const onClickLogin = (credentials) => {
        //TODO: Validar datos
        //      Feedback de errores
        //      Feedback de login en proceso
        this.props.loginUser(credentials, this.props.history);
    }

    return (
      <div className="container" style={{ marginTop:  '30px'}}>
        <form onSubmit={this.props.handleSubmit((credentials) => onClickLogin(credentials))}>
          Email:
          <Field type="text" name="email" component="input" />
          Password:
          <Field type="text" name="password" component="input" />
          <button className="teal btn-flat right white-text" type="submit">
            Login
          </button>
        </form>
      </div>
    );
  }
}

LoginForm = connect(null, actions)(LoginForm);

export default reduxForm({
  form: 'surveyForm'
})(LoginForm);
