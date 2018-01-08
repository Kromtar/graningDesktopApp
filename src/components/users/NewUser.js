//Form nuevo usuario
import React, { Component } from 'react';
import $ from 'jquery';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import InputField from '../aux/InputField';
import ReviewNewUser from './ReviewNewUser';
import validateUserFrom from './validateUserForm';

class NewUser extends Component {

  componentDidMount(){
    $("#review").hide();
  }

  render(){
      return(
        <div>

          {/* Form */}
          <form id="userForm" onSubmit={this.props.handleSubmit(() => {
            $("#userForm").hide();
            $("#review").show();
          })}>

            <div className="row z-depth-1" style={{marginBottom: '15px'}}>
              <div className="col s6">
                <Field type="text" name="name" placeholder="Federico (obligatorio)" component={InputField} label="Nombre"/>
              </div>
              <div className="col s6">
                <Field type="text" name="surname" placeholder="Jensen (obligatorio)" component={InputField} label="Apellido"/>
              </div>
              <div className="col s6">
                <Field type="number" name="phone1" placeholder="7596685" component={InputField} label="Telefono 1"/>
                <Field type="email" name="email" placeholder="graning@granign.com (obligatorio)" component={InputField} label="Email"/>
              </div>
              <div className="col s6">
                <Field type="number" name="phone2" placeholder="032659875" component={InputField} label="Telefono 2"/>
              </div>
            </div>

            <div className="row z-depth-1" style={{marginBottom: '15px'}}>
              <div className="col s6">
                  <Field type="text" name="company" placeholder="Esval (obligatorio)" component={InputField} label="Empresa"/>
                  <Field type="text" name="department" placeholder="Finanzas" component={InputField} label="Departamento"/>
              </div>
              <div className="col s6">
                  <Field type="text" name="address" placeholder="Libertad of 236" component={InputField} label="Direccion"/>
                  <Field type="text" name="workstation" placeholder="Ejecutivo (obligatorio)" component={InputField} label="Puesto"/>
              </div>
            </div>

            <div className="row z-depth-1" style={{marginBottom: '15px'}}>
              <div className="col s6">
                <Field type="text" name="password" placeholder="(obligatorio)" component={InputField} label="Contraseña (El usuario luego puede cambiarla)"/>
                <div>
                  <label>Tipo de Cuenta</label>
                  <div>
                    <Field name="role" component="select">
                      <option value="CLEINT">Cuenta para un cliente</option>
                      <option value="ADMIN">Cuenta para empleado de Graning</option>
                    </Field>
                  </div>
                </div>

              </div>
              <div className="col s6">
                <Field type="text" name="passwordChecker" placeholder="(obligatorio)" component={InputField} label="Repite la contraseña"/>
              </div>
            </div>

            {/* Nav Modal New User*/}
            <div className="divider"></div>
            <div className="modal-footer" style={{marginTop: '25px'}} >
              <a
                onClick={() => this.props.onClose()}
                className="modal-action modal-close waves-effect waves-green btn-flat">
                Cerrar
              </a>
              <button className="teal btn-flat right white-text" type="submit">
                Continuar
                <i className="material-icons right">done</i>
              </button>
            </div>

          </form>

          {/* Review */}
          <div id="review">
            <ReviewNewUser />

            {/* Nav Modal Review*/}
            <div className="divider"></div>
            <div className="modal-footer" style={{marginTop: '25px'}} >
              <a
                onClick={() => {
                  $("#review").hide();
                  $("#userForm").show();
                }}
                className="waves-effect waves-green btn-flat">
                Atras
              </a>
              <button
                className="teal btn-flat right white-text"
                onClick={() => { this.props.onUserSubmit(this.props.form); }}
              >
                Añadir Usuario
                <i className="material-icons right">person_add</i>
              </button>
            </div>
          </div>
        </div>
    );
  }
};

function mapStateToProps(state){
  return {
    form: state.form.newUserForm
  };
};

NewUser = connect(mapStateToProps)(NewUser);

export default reduxForm({
  //validate: validateUserFrom,
  form: 'newUserForm',
  initialValues: { role: 'CLIENT' }
})(NewUser);
