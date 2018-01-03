import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../actions';

//TODO: Asilar acciones no relacionadas

class LoginForm extends Component {


  render(){

    const onClickLogin = (credentials) => {
        //TODO: Validar datos
        this.props.loginUser(credentials, this.props.history);
    }

    return (
      <div>
        <form onSubmit={this.props.handleSubmit((credentials) => onClickLogin(credentials))}>
          Email:
          <Field type="text" name="email" component="input" />
          Pass:
          <Field type="text" name="password" component="input" />
          <button type="submit">
            Next
          </button>
        </form>
      </div>
    );
  }
}

LoginForm = connect(null, actions)(withRouter(LoginForm));

export default reduxForm({
  form: 'surveyForm'
})(LoginForm);
