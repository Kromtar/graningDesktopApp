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

class ProjectEdit extends Component {

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

  render(){
    return(
      <div>
        <form id="userForm" onSubmit={(this.props.handleSubmit(() => this.props.editProjectGeneral(this.props.formValue)))}>

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
    projectUsers: state.projectUsers,
    initialValues: {
      name: state.projectDetail.name,
      proyectnumber: state.projectDetail.proyectnumber,
      contractnumber: state.projectDetail.contractnumber,
      purchaseordernumber: state.projectDetail.purchaseordernumber,
      openprojectdate: moment(state.projectDetail.openprojectdate).format('DD-MM-YYYY'),
      closeprojectdate: state.projectDetail.closeprojectdate ? moment(state.projectDetail.closeprojectdate).format('DD-MM-YYYY') : null,
      term: state.projectDetail.term,
    }
  };
};

InitializeFromStateForm = connect(mapStateToProps, actions)(InitializeFromStateForm);

export default InitializeFromStateForm;
