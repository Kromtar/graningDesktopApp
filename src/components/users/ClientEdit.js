import _ from 'lodash';
import React, { Component } from 'react';
import $ from 'jquery';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { reduxForm, Field } from 'redux-form';
import moment from 'moment';

import InputField from '../aux/inputField';

class ClientEdit extends Component {
  render(){

    return(
      <div>
        <form id="userEditForm" onSubmit={
          (this.props.handleSubmit(() => {

          }))
        }>

        {/* Cuerpo con footer fijo */}
        <div style={{display: 'flex', minHeight: '91vh', flexDirection: 'column'}}>
          <main className="container" style={{flex: '1 1 auto', marginTop: '22px'}}>

            {/* Titulo */}
            <div className="card">
              <div className="card-content white-text" style={{paddingBottom: '2px', paddingTop: '10px'}}>
                <span className="card-title">
                  Editando Cliente:
                  <span style={{marginTop: '5px'}} className="new badge orange" data-badge-caption="Modo editor" />
                </span>
              </div>
            </div>


            {/* Contenido del detalle */}
            <div style={{overflow: 'auto', maxHeight: '68vh'}}>
              AQUI EDITAMOS LA INFORMACION DEL USUARIO
            </div>

          </main>


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
                <button className="teal btn-flat right white-text" type="submit">
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
    enableReinitialize : true
})(ClientEdit);

function mapStateToProps(state){
return {

  }
};

InitializeFromStateForm = connect(mapStateToProps, actions)(InitializeFromStateForm);

export default InitializeFromStateForm;
