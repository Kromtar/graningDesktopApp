import _ from 'lodash';
import React, { Component } from 'react';
import $ from 'jquery';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { reduxForm, Field } from 'redux-form';
import moment from 'moment';

import InputField from '../aux/inputField';
import validateUserForm from './validateUserForm';

import DeleteClientConfirmModal from './subComponents/deleteClientConfirmModal';

class ClientEdit extends Component {

  state = {
    newPassWord: '',
  }

  componentDidMount(){
    $('#deleteClientConfirm').modal({
       dismissible: false,
       opacity: .5,
       inDuration: 300,
       outDuration: 200,
       ready: function(modal, trigger) {},
       complete: function() {}
     });

     $('#generateNewPassWord').modal({
      opacity: .5,
      inDuration: 300,
      outDuration: 200,
      ready: function(modal, trigger) {},
      complete: function() {}
    });
  }

  generatePassword() {
    var length = 5,
        charset = "abcdefghijklmnopqrstuvwxyz0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }

  renderNewPassword(){
    if(this.state.newPassWord !== ''){
      return (
        <div
          className="row z-depth-3"
          style={{
            marginLeft: '10px',
            marginRight: '10px',
            borderColor: '#00305b',
            borderRadius: '12px',
            borderWidth: '1px',
            borderStyle: 'solid'
          }}
        >
          <div className="col s12" style={{marginTop: '10px', marginBottom: '10px'}}>
            La nueva contraseña del cliente es: <b>{this.state.newPassWord}</b>
            <a
              onClick={() => this.setState({newPassWord: ''})}
              className="waves-effect btn right" style={{backgroundColor: '#ff6600'}}>
              No cambiar clave
            </a>
          </div>
        </div>
      );
    }else{
      return <div></div>
    }
  }

  render(){
    return(
      <div>
        <form id="userEditForm" onSubmit={
          (this.props.handleSubmit( async () => {

            await this.props.editClientGeneral(this.props.clientDetail._id, this.props.formValue.values);

            if(this.state.newPassWord !== ''){
              await this.props.newPasswordForUser(this.props.clientDetail._id, this.state.newPassWord);
            }

            await this.props.getClientDetail(this.props.clientDetail._id);
            await this.props.fetchClients();

            this.props.windowClientTabViewDetail();

          }))
        }>

        {/* Cuerpo con footer fijo */}
        <div style={{display: 'flex', minHeight: '91vh', flexDirection: 'column'}}>
          <main className="container" style={{flex: '1 1 auto', marginTop: '22px'}}>

            {/* Titulo */}
            <div className="card">
              <div className="card-content white-text" style={{paddingBottom: '2px', paddingTop: '10px'}}>
                <span className="card-title">
                  <i className="material-icons left">person</i>
                  Editando Cliente: {this.props.clientDetail.name} {this.props.clientDetail.surname}
                  <span style={{marginTop: '5px'}} className="new badge orange" data-badge-caption="Modo editor" />
                </span>
              </div>
            </div>


            {/* Contenido del detalle */}
            <div style={{overflow: 'auto', maxHeight: '68vh'}}>

              {/* General */}
              <div
                className="row z-depth-3"
                style={{
                  marginLeft: '10px',
                  marginRight: '10px',
                  borderColor: '#00305b',
                  borderRadius: '12px',
                  borderWidth: '1px',
                  borderStyle: 'solid'
                }}
              >

                <div className="col s6">
                  <Field type="text" name="name" placeholder="Felipe" label="Nombre" component={InputField} />
                  <Field type="text" name="surname" placeholder="Arellano" label="Apellido" component={InputField} />
                  <Field type="text" name="company" placeholder="Esval" label="Compañia" component={InputField} />
                  <Field type="text" name="department" placeholder="Finanzas" label="Departamento" component={InputField} />
                  <Field type="text" name="workstation" placeholder="Ejecutivo" label="Puesto de trabajo" component={InputField} />
                </div>

                <div className="col s6">
                  <Field type="email" name="email" placeholder="mail@mail.com" label="Email" component={InputField} />
                  <Field type="number" name="phone1" placeholder="53269852" label="Teléfono 1" component={InputField} />
                  <Field type="number" name="phone2" placeholder="96259875" label="Teléfono 2" component={InputField} />
                  <Field type="text" name="address" placeholder="Libertad 526" label="Dirección" component={InputField} />
                </div>

              </div>

              {/* Panel de botones extras */}
              <div
                className="row z-depth-3"
                style={{
                  marginLeft: '10px',
                  marginRight: '10px',
                  borderColor: '#00305b',
                  borderRadius: '12px',
                  borderWidth: '1px',
                  borderStyle: 'solid'
                }}
              >

                <div className="col s12" style={{marginTop: '10px', marginBottom: '10px'}}>
                  <a
                    onClick={() => this.setState({newPassWord: this.generatePassword()})}
                    className="waves-effect btn left" style={{backgroundColor: '#3399ff'}}>
                    Generar nueva clave para el cliente
                  </a>
                  <a
                    onClick={() => $("#deleteClientConfirm").modal('open')}
                    className="waves-effect btn right" style={{backgroundColor: '#ff6600'}}>
                    <i className="material-icons right">delete</i>
                    Borrar Cliente
                  </a>
                </div>

              </div>

              {this.renderNewPassword()}


            </div>
          </main>


          {/* Modal eliminar un cliente*/}
          <div id="deleteClientConfirm" className="modal" style={{top: '2% !important'}}>
            <DeleteClientConfirmModal
              name={this.props.clientDetail.name}
              surname={this.props.clientDetail.surname}
              onClose={() => $("#deleteClientConfirm").modal('close')}
              onConfirm={async () => {
                await this.props.deleteClient(this.props.clientDetail._id);
                await this.props.fetchClients();
                $("#deleteClientConfirm").modal('close');
                this.props.windowClientTabViewList();
              }}
            />
          </div>


          {/* Barra de nav */}
          <footer>
            <div className="divider" style={{marginBottom: '15px'}}></div>
            <div className="row">
              <div className="col s6 left-align">
                <a onClick={() => this.props.windowClientTabViewDetail()} className="waves-effect waves-light btn-flat">
                  Retroceder
                </a>
              </div>
              <div className="col s6 right-align">
                <button className="btn right" style={{background: '#2a6443'}} type="submit">
                  Guardar
                  <i className="material-icons right">cloud_upload</i>
                </button>
              </div>
            </div>
          </footer>
        </div>
      </form>
     </div>
   );
 }
};

let InitializeFromStateForm = reduxForm({
    form: 'editClientForm',
    validate: validateUserForm,
    enableReinitialize : true
})(ClientEdit);

function mapStateToProps(state){
  return {
    formValue: state.form.editClientForm,
    clientDetail: state.clientDetail,
    initialValues: {
      name: state.clientDetail.name,
      surname: state.clientDetail.surname,
      company: state.clientDetail.company,
      department: state.clientDetail.department,
      workstation: state.clientDetail.workstation,
      email: state.clientDetail.email,
      phone1: state.clientDetail.phone1,
      phone2: state.clientDetail.phone2,
      address: state.clientDetail.address
    }
  }
};

InitializeFromStateForm = connect(mapStateToProps, actions)(InitializeFromStateForm);

export default InitializeFromStateForm;
