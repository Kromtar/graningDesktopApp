//Form nuevo proyecto
import React, { Component } from 'react';
import $ from 'jquery';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';

import InputField from '../aux/inputField';
import datePicker from '../aux/datePicker';
import ReviewNewProject from './ReviewNewProject';
import validateProjectForm from './validateProjectForm';

class NewProject extends Component {

  componentDidMount(){
    $("#review").hide();
  }

  render(){

      return(
        <div>

          {/* Form */}
          <form id="projectForm" onSubmit={this.props.handleSubmit(() => {
            $("#projectForm").hide();
            $("#review").show();
          })}>

            <div className="row z-depth-1" style={{marginBottom: '15px'}}>
              <div className="col s6">
                <Field type="text" name="name" placeholder="Tranpolin excesivamente grande (obligatorio)" component={InputField} label="Nombre"/>
              </div>
              <div className="col s6">
                <Field type="text" name="internalcode" placeholder="1801 (obligatorio)" component={InputField} label="Codigo interno Graning"/>
              </div>
            </div>

            <div className="row z-depth-1" style={{marginBottom: '15px'}}>
              <div className="col s6">
                <Field type="text" name="proyectnumber" placeholder="2ds5698as" component={InputField} label="Nº Proyecto"/>
              </div>
              <div className="col s6">
                <Field type="text" name="contractnumber" placeholder="256365875" component={InputField} label="Nº Contrato"/>
              </div>
              <div className="col s6">
                <Field type="text" name="purchaseordernumber" placeholder="6358a6522" component={InputField} label="Nº Orden de compra"/>
              </div>
            </div>

            <div className="row z-depth-1" style={{marginBottom: '15px'}}>
              <div className="col s6">
                <Field type="number" name="term" placeholder="120" component={InputField} label="Plazo (en dias)"/>
              </div>
              <div className="col s6">
                <Field name="openprojectdate" component={datePicker} label="Fecha inicio de proyecto"/>
              </div>
            </div>

            <div style={{height: '200px'}}>
              <p>
                Luego de crear un nuevo proyecto podras asignar clientes, modificar las etapas/revisiones y cargar los documentos.
              </p>
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

            <ReviewNewProject />

            {/* Nav Modal Review*/}
            <div className="divider"></div>
            <div className="modal-footer" style={{marginTop: '25px'}} >
              <a
                onClick={() => {
                  $("#review").hide();
                  $("#projectForm").show();
                }}
                className="waves-effect waves-green btn-flat">
                Atras
              </a>
              <button
                className="teal btn-flat right white-text"
                onClick={async () => {
                  await this.props.onProjectSubmit(this.props.form);
                  await this.props.fetchProjects();
                }}
              >
                Añadir Proyecto
                <i className="material-icons right">extension</i>
              </button>
            </div>
          </div>

        </div>
    );
  }
};

function mapStateToProps(state){
  return {
    form: state.form.newProjectForm
  };
};

NewProject = connect(mapStateToProps, actions)(NewProject);

export default reduxForm({
  validate: validateProjectForm,
  form: 'newProjectForm',
  initialValues: { openprojectdate: null }
})(NewProject);
