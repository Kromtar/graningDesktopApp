import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import $ from 'jquery';

class AddStage extends Component {
  render(){
    return(
      <div>
        <label>Nombre de la etapa</label>
        <input placeholder="Ing. Basica" id="stage" type="text" className="validate" />
        <div className="modal-footer">
          <div className="divider"></div>
          <div className="col s6">
            <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat">Cerrar</a>
          </div>
          <div className="col s6">
            <a
            onClick={() => {
              if($('#stage').val().length <= 3){
                //TODO:Crear alerta
                console.log('Pocos caracteres');
              }else{
                this.props.tempNewStage($('#stage').val(), this.props.newStage.length);
                $('#stage').val('');
                $('#newStageModal').modal('close');
              }
            }}
            className="waves-effect right waves-green green btn"
            >
              Guardar
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
