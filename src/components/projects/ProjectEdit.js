import _ from 'lodash';
import React, { Component } from 'react';
import $ from 'jquery';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { reduxForm, Field } from 'redux-form';
import moment from 'moment';

import datePicker from '../aux/DatePicker';
import InputField from '../aux/InputField';
import validateEditProjectForm from './validateEditProjectForm';
import AddStage from './AddStage';

class ProjectEdit extends Component {

  componentDidMount(){
    $('#collapsibleTemp').collapsible();
    $('#collapsibleEdit').collapsible();

    $('#newStageModal').modal({
     dismissible: false,
     opacity: .5,
     inDuration: 300,
     outDuration: 200,
     ready: function(modal, trigger) {},
     complete: function() {}
   });
  }

  badgeRender(){
    if(this.props.projectDetail.finished){
      return (
        <span style={{marginTop: '5px'}} className="new badge green" data-badge-caption=" Proyecto finalizado" />
      );
    }else{
      return (
        <span style={{marginTop: '5px'}} className="new badge blue" data-badge-caption=" Proyecto en curso" />
      );
    }
  }

  dateFormat(dateIn){
    const mydate = new Date(dateIn);
    return mydate.toLocaleDateString('en-GB');
  }

  renderCollapsibleTemp(){
    return (
      <ul id="collapsibleTemp" className="collapsible popout" data-collapsible="accordion">
        {this.renderProjectStageTemp()}
      </ul>
    );
  }

  renderProjectStageTemp(){
    return _.map(this.props.newStage, stage => {
      return (
        <li key={stage.name}>
          <div className="collapsible-header" style={{display: 'block'}}>
            <i className="material-icons">details</i>{stage.name}
            <i onClick={() => this.props.deleteTempStage(stage.tempId)} className="material-icons right" >delete</i>
          </div>
          <div className="collapsible-body">
            <div className="row z-depth-1" style={{paddingTop: '6px', marginBottom: '0px'}}>
              content
            </div>
          </div>
        </li>
      );
    });
  }

  renderCollapsibleEdit(){
    if(typeof(this.props.projectDetail._stage) !== "undefined"){
      if(this.props.projectDetail._stage.length > 0){
        return (
          <ul id="collapsibleEdit" className="collapsible popout" data-collapsible="accordion">
            {this.renderProjectStage()}
          </ul>
        );
      }
    }
    if(typeof(this.props.projectDetail._stage) !== "undefined" && this.props.newStage.length === 0){ //Solo pone el mensaje si tampoco hay tepmps
      return <blockquote><p>No se ha creado ninguna etapa de proyecto aun</p></blockquote>;
    }
  }

  renderProjectStage(){
    return _.map(this.props.projectDetail._stage, stage => {
      return (
          <li id={stage._id} key={stage._id}>
            <div className="collapsible-header" style={{display: 'block'}}>
              <i className="material-icons">assistant_photo</i>{stage.name}
              <i onClick={() => {
                this.props.addStageidForDelete(stage._id);
                $("#"+stage._id).hide();
              }}
              className="material-icons right"
              >
                delete
              </i>
            </div>
            <div className="collapsible-body">
              <div className="row z-depth-1" style={{paddingTop: '6px', marginBottom: '0px'}}>
                {this.renderProjectRev(stage)}
              </div>
            </div>
          </li>
      );
    });
  }

  renderProjectRev(stage){
    if(stage._review.length > 0){
      return _.map(stage._review, review => {
        return (
          <div key={review._id}>
            <div className="col s4">
             <p><b>{review.name}</b></p>
           </div>
           <div className="col s4">
             <p>Fecha entrega: {review.companytoclientdate ? this.dateFormat(review.companytoclientdate) : 'Fecha pendiente'}</p>
           </div>
           <div className="col s4">
             <p>Fecha correccion: {review.clienttocompany ? this.dateFormat(review.clienttocompany) : 'Fecha pendiente'}</p>
           </div>
         </div>
        );
      });
    } else {
      return <blockquote><p>No se ha creado ninguna Rev. en esta etapa aun</p></blockquote>;
    }
  }

  render(){
    return(
      <div>

        <form id="userForm" onSubmit={
          (this.props.handleSubmit(() => {

            //Procesa la info general
            //TODO: Logica para no hacer peticiones innecesarias
            this.props.editProjectGeneral(this.props.projectDetail._id, this.props.formValue).then(() => {
              this.props.addStageToProject(this.props.projectDetail._id).then(() => {
                this.props.deleteStageFromProject(this.props.projectDetail._id).then(() => {
                  this.props.getProjectDetail(this.props.projectDetail._id);
                  this.props.fetchProjects();
                });
              });
            });
          }))
        }>

        {/* Cuerpo con footer fijo */}
        <div style={{display: 'flex', minHeight: '91vh', flexDirection: 'column'}}>
          <main className="container" style={{flex: '1 1 auto', marginTop: '23px'}}>

            {/* Titulo */}
            <div className="card blue-grey darken-1">
              <div className="card-content white-text" style={{paddingBottom: '2px', paddingTop: '10px'}}>
                <span className="card-title">
                  Editando Proyecto   Nº {this.props.projectDetail.internalcode}
                  <span style={{marginTop: '5px'}} className="new badge orange" data-badge-caption="Modo editor" />
                  {this.badgeRender()}
                </span>
              </div>
            </div>


            {/* Contenido del detalle */}
            <div style={{overflow: 'auto', maxHeight: '68vh'}}>

              {/* General */}
              <div className="row z-depth-1" style={{marginLeft: '10px', marginRight: '10px'}}>

                <div className="col s6">
                  <Field type="text" name="name" placeholder="Nombre Proyecto" label="Nombre:" component={InputField} />
                  <Field type="text" name="proyectnumber" placeholder="2ds5698as" label="Nº Proyecto:" component={InputField} />
                  <Field type="text" name="contractnumber" placeholder="256365875" label="Nº Contrato:" component={InputField} />
                  <Field type="text" name="purchaseordernumber" placeholder="6358a6522" label="Nº Orden de compra" component={InputField} />
                </div>

                <div className="col s6">
                  <Field name="openprojectdate" component={datePicker} label="Fecha inicio de proyecto"/>
                  <Field name="closeprojectdate" component={datePicker} label="Fecha cierre proyecto"/>
                  <Field type="number" name="term" placeholder="120" label="Plazo (en dias):" component={InputField} />
                </div>

              </div>

              {/* Etapas */}
              <div className="row z-depth-1" style={{marginLeft: '10px', marginRight: '10px', paddingTop: '6px'}}>

                <div className="col s12">
                <div className="row">
                  <div className="col s6">
                    <p><b>Avance del proyecto:</b></p>
                  </div>
                  <div className="col s6">
                    <a
                      onClick={() => $("#newStageModal").modal('open')}
                      style={{marginTop: '7px'}}
                      className="teal waves-effect btn-flat right white-text">
                      Añadir etapa al proyecto
                    </a>
                  </div>
                </div>
                <div className="divider" style={{marginBottom: '5px'}}></div>
                  {this.renderCollapsibleTemp()}
                  {this.renderCollapsibleEdit()}
                </div>

              </div>

            </div>

            {/* Modal nueva stage */}
            <div id="newStageModal" className="modal" style={{top: '2% !important'}}>
              <div className="modal-content" style={{paddingBottom: '3px'}}>
                <h5 className="header">Añade una nueva etapa al proyecto</h5>
                <AddStage />
              </div>
            </div>

          </main>

          {/* Barra de nav */}
          <footer>
            <div className="divider" style={{marginBottom: '15px'}}></div>
            <div className="row">
              <div className="col s6 left-align">
                <a onClick={() => this.props.windowProjectTabViewDetail()} className="waves-effect waves-light btn-flat">
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
    form: 'editProjectForm',
    validate: validateEditProjectForm,
    enableReinitialize : true
})(ProjectEdit);

function mapStateToProps(state){
  return {
    formValue: state.form.editProjectForm,
    projectDetail: state.projectDetail,
    newStage: state.newStage,
    projectUsers: state.projectUsers,
    initialValues: {
      name: state.projectDetail.name,
      proyectnumber: state.projectDetail.proyectnumber,
      contractnumber: state.projectDetail.contractnumber,
      purchaseordernumber: state.projectDetail.purchaseordernumber,
      openprojectdate: state.projectDetail.openprojectdate ? moment(state.projectDetail.openprojectdate).format('DD-MM-YYYY') : null,
      closeprojectdate: state.projectDetail.closeprojectdate ? moment(state.projectDetail.closeprojectdate).format('DD-MM-YYYY') : null,
      term: state.projectDetail.term,
    }
  };
};

InitializeFromStateForm = connect(mapStateToProps, actions)(InitializeFromStateForm);

export default InitializeFromStateForm;
