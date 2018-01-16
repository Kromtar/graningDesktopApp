import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import $ from 'jquery';
import DatePicker from 'react-datepicker';
import moment from 'moment';

class AddRev extends Component {

  state = {
    companytoclientdate: null,
    clienttocompany: null,
  };

  render(){
    return(
      <div>
        <div className="row">
          <label><b>Nombre de la revision</b></label>
          <input placeholder="Rev. B" id="rev" type="text" className="validate" />
        </div>
        <div className="row">
          <div className="col s6">
            <label><b>Fecha de entrega</b></label>
            <DatePicker
              dateFormat="DD-MM-YYYY"
              onChange={(date) => this.setState({ companytoclientdate: date })}
              selected={this.state.companytoclientdate ? moment(this.state.companytoclientdate, 'DD-MM-YYYY') : null}
              todayButton={"Hoy"}
              isClearable={true}
              showYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={3}
            />
          </div>
          <div className="col s6">
            <label><b>Fecha de revision</b></label>
            <DatePicker
              dateFormat="DD-MM-YYYY"
              onChange={(date) => this.setState({ clienttocompany: date })}
              selected={this.state.clienttocompany ? moment(this.state.clienttocompany, 'DD-MM-YYYY') : null}
              todayButton={"Hoy"}
              isClearable={true}
              showYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={3}
            />
          </div>
        </div>
        <div style={{height: '35vh'}} />
        <div className="modal-footer">
          <div className="divider"></div>
          <div className="col s6">
            <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat">Cerrar</a>
          </div>
          <div className="col s6">
            <a
              onClick={() => {
                if($('#rev').val().length <= 3){
                  //TODO:Crear alerta
                  console.log('Pocos caracteres');
                }else{
                  var data = { name: $('#rev').val(),
                               companytoclientdate: this.state.companytoclientdate ? this.state.companytoclientdate.format("DD/MM/YYYY") : null,
                               clienttocompany: this.state.clienttocompany ? this.state.clienttocompany.format("DD/MM/YYYY") : null
                             }
                  this.props.onSaveTmpRev(data);
                  $('#rev').val('');
                  this.setState({ companytoclientdate: null });
                  this.setState({ clienttocompany: null });
                  $('#newRevModal').modal('close');
                }
              }}
              className="waves-effect right waves-light btn"
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

export default connect(null, actions)(AddRev);
