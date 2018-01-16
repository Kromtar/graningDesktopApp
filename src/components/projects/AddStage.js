import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import $ from 'jquery';

class AddStage extends Component {
  render(){
    return(
      <div>
        <label><b>Nombre de la etapa</b></label>
        <input placeholder="Ing. Básica" id="stage" type="text" className="validate" />
        <div className="modal-footer">
          <div className="divider"></div>
          <div className="col s6">
            <a href="#!" className="modal-action modal-close waves-effect waves-light btn-flat">Cerrar</a>
          </div>
          <div className="col s6">
            <a
            onClick={() => {
              if($('#stage').val().length <= 2){
                //TODO:Crear alerta
                console.log('Pocos caracteres');
              }else{
                this.props.tempNewStage($('#stage').val(), this.props.newStage.length);
                $('#stage').val('');
                $('#newStageModal').modal('close');
              }
            }}
            className="waves-effect waves-light right btn"
            style={{backgroundColor: '#2a6443'}}
            >
              Añadir
            </a>
          </div>
        </div>
      </div>
    );
  }
};

function mapStateToProps(state){
  return {
    newStage: state.newStage
  };
};

export default connect(mapStateToProps, actions)(AddStage);
