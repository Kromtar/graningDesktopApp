//Check contenido nuevo usuario
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';

class ReviewNewUser extends Component {

  renderReviewContent(){
    if(typeof(this.props.form.newUserForm.values) !== "undefined"){
      return (
        <div>
          {this.props.form.newUserForm.values.name}
          {this.props.form.newUserForm.values.surname}
          {this.props.form.newUserForm.values.phone1}
          {this.props.form.newUserForm.values.phone2}
          {this.props.form.newUserForm.values.email}
          {this.props.form.newUserForm.values.company}
          {this.props.form.newUserForm.values.department}
          {this.props.form.newUserForm.values.address}
          {this.props.form.newUserForm.values.workstation}
          {this.props.form.newUserForm.values.password}
          {this.props.form.newUserForm.values.role}
        </div>
      );
    }
  }

  render(){
      return(
        <div>
          {this.renderReviewContent()}
        </div>
      );
    }
};


function mapStateToProps(state){
  return {
    form: state.form
  };
};

export default connect(mapStateToProps)(ReviewNewUser);
