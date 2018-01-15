//Check contenido nuevo usuario
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';

class ReviewNewUser extends Component {

  renderReviewContent(){
    if(typeof(this.props.form.newUserForm.values) !== "undefined"){
      return (
        <div>
          <p className="caption">Revisa que la información del nuevo cliente sea correcta... </p>
          <div className="row z-depth-1" style={{marginBottom: '15px'}}>
            <div className="col s6">
              <p><b>Nombre:</b> {this.props.form.newUserForm.values.name}</p>
              <p><b>Apellido:</b> {this.props.form.newUserForm.values.surname}</p>
              <p><b>Teléfono 1:</b> {this.props.form.newUserForm.values.phone1}</p>
              <p><b>Teléfono 2:</b> {this.props.form.newUserForm.values.phone2}</p>
              <p><b>Email:</b> {this.props.form.newUserForm.values.email}</p>
            </div>
            <div className="col s6">
              <p><b>Compañia:</b> {this.props.form.newUserForm.values.company}</p>
              <p><b>Departamento:</b> {this.props.form.newUserForm.values.department}</p>
              <p><b>Direccién:</b> {this.props.form.newUserForm.values.address}</p>
              <p><b>Puesto de trabajo:</b> {this.props.form.newUserForm.values.workstation}</p>
              <p><b>Contraseña:</b> {this.props.form.newUserForm.values.password}</p>
            </div>
            <div className="col s6">
              <p>
                <b>Tipo de cuenta: </b>
                {this.props.form.newUserForm.values.role === 'CLIENT' ? 'Para un cliente' : 'Para un empleado de Graning' }
              </p>
            </div>
          </div>
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
