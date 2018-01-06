//Seccion de listado de clientes
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';

class NewUser extends Component {
  //<Field type="text" name="test" component="input" />
  render(){
      return(
        <div>
          <form>
            <div className="row z-depth-2" style={{marginBottom: '15px'}}>
              <div className="col s6">
                <label>Nombre:</label>
                <Field style={{marginBottom: '5px'}} type="text" name="name" component="input" />
              </div>
              <div className="col s6">
                <label>Apellido:</label>
                <Field style={{marginBottom: '5px'}} type="text" name="surname" component="input" />
              </div>
            </div>
            <div className="row z-depth-2" style={{marginBottom: '15px'}}>
              <div className="col s6">
                <label>Telefono 1:</label>
                <Field style={{marginBottom: '5px'}} type="text" name="phone1" component="input" />
                <label>Email:</label>
                <Field style={{marginBottom: '5px'}} type="text" name="phone2" component="input" />
              </div>
              <div className="col s6">
                <label>Telefono 2:</label>
                <Field style={{marginBottom: '5px'}} type="text" name="email" component="input" />
              </div>
            </div>
            <div className="row z-depth-2" style={{marginBottom: '0px'}}>
              <div className="col s6">
                  <label>Empresa:</label>
                  <Field style={{marginBottom: '5px'}} type="text" name="company" component="input" />
                  <label>Departamento de trabajo:</label>
                  <Field style={{marginBottom: '5px'}} type="text" name="department" component="input" />
              </div>
              <div className="col s6">
                  <label>Direccion:</label>
                  <Field style={{marginBottom: '5px'}} type="text" name="address" component="input" />
                  <label>Puesto:</label>
                  <Field style={{marginBottom: '5px'}} type="text"  name="workstation" component="input" />
              </div>
            </div>

          </form>
        </div>
      );
    }
};

export default reduxForm({
  form: 'newUserForm'
})(NewUser);
