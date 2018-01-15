//Form nuevo usuario
import React, { Component } from 'react';
import $ from 'jquery';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';

import InputField from '../aux/inputField';
import ReviewNewUser from './ReviewNewUser';
import validateUserForm from './validateUserForm';

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

            <div
              className="row z-depth-3"
              style={{
                marginBottom: '15px',
                borderColor: '#00305b',
                borderRadius: '12px',
                borderWidth: '1px',
                borderStyle: 'solid'
              }}
            >
              <div className="col s6">
                <Field type="text" name="name" placeholder="Federico (obligatorio)" component={InputField} label="Nombre"/>
              </div>
              <div className="col s6">
                <Field type="text" name="surname" placeholder="Jensen (obligatorio)" component={InputField} label="Apellido"/>
              </div>
              <div className="col s6">
                <Field type="number" name="phone1" placeholder="7596685" component={InputField} label="Teléfono 1"/>
                <Field type="email" name="email" placeholder="graning@granign.com (obligatorio)" component={InputField} label="Email"/>
              </div>
              <div className="col s6">
                <Field type="number" name="phone2" placeholder="032659875" component={InputField} label="Teléfono 2"/>
              </div>
            </div>

            <div
              className="row z-depth-3"
              style={{
                marginBottom: '15px',
                borderColor: '#00305b',
                borderRadius: '12px',
                borderWidth: '1px',
                borderStyle: 'solid'
              }}
            >
              <div className="col s6">
                  <Field type="text" name="company" placeholder="Esval (obligatorio)" component={InputField} label="Empresa"/>
                  <Field type="text" name="department" placeholder="Finanzas" component={InputField} label="Departamento"/>
              </div>
              <div className="col s6">
                  <Field type="text" name="address" placeholder="Libertad of 236" component={InputField} label="Dirección"/>
                  <Field type="text" name="workstation" placeholder="Ejecutivo (obligatorio)" component={InputField} label="Puesto"/>
              </div>
            </div>

            <div
              className="row z-depth-3"
              style={{
                marginBottom: '15px',
                borderColor: '#00305b',
                borderRadius: '12px',
                borderWidth: '1px',
                borderStyle: 'solid'
              }}
            >
              <div className="col s6">
                <Field type="text" name="password" placeholder="(obligatorio)" component={InputField} label="Contraseña"/>
                <div>
                  <label><b>Tipo de Cuenta</b></label>
                  <div>
                    <Field name="role" component="select">
                      <option value="CLIENT">Cuenta cliente</option>
                      <option value="ADMIN">Cuenta empleadoGraning</option>
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
              <button className="btn right" type="submit" style={{color: '#fff', backgroundColor: '#2a6443'}}>
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
                Atrás
              </a>
              <button
                className="btn right"
                style={{color: '#fff', backgroundColor: '#2a6443'}}
                onClick={async () => {
                  await this.props.onUserSubmit(this.props.form);
                  await this.props.fetchClients();
                }}
              >
                Añadir Cliente
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

NewUser = connect(mapStateToProps, actions)(NewUser);

export default reduxForm({
  validate: validateUserForm,
  form: 'newUserForm',
  initialValues: { role: 'CLIENT' }
})(NewUser);
