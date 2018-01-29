import React, { Component } from 'react';
import { connect } from 'react-redux';

class ReviewNewProject extends Component {

  renderDate(){
    if(typeof(this.props.form.newProjectForm.values) !== "undefined"){
      if(typeof(this.props.form.newProjectForm.values.openprojectdate) === "string"){
        return (
          <u>{this.props.form.newProjectForm.values.openprojectdate}</u>
        );
      }
    }
  }

  renderReviewContent(){
    if(typeof(this.props.form.newProjectForm.values) !== "undefined"){
      return (
        <div>
          <p className="caption">
            Revisa que la información del proyecto sea correcta
          </p>
          <div className="row z-depth-1" style={{marginBottom: '15px'}}>
            <div className="col s6">
              <p><b>Nombre:</b> {this.props.form.newProjectForm.values.name}</p>
              <p><b>Codigo interno Graning:</b> {this.props.form.newProjectForm.values.internalcode}</p>
              <p><b>Nº Proyecto:</b> {this.props.form.newProjectForm.values.proyectnumber}</p>
              <p><b>Nº Contrato:</b> {this.props.form.newProjectForm.values.contractnumber}</p>
              <p><b>Nº Orden de compra:</b> {this.props.form.newProjectForm.values.purchaseordernumber}</p>
            </div>
            <div className="col s6">
              <p><b>Plazo (en dias):</b> {this.props.form.newProjectForm.values.term}</p>
              <p><b>Fecha inicio de proyecto:</b> {this.renderDate()}</p>
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

export default connect(mapStateToProps)(ReviewNewProject);
