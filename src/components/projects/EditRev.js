import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import $ from 'jquery';
import DatePicker from 'react-datepicker';
import moment from 'moment';

//value={this.props.projectDetail._stage[this.props.infoForUpdateRev.stageIndex]._review[this.props.infoForUpdateRev.revIndex].name}


class EditRev extends Component {

  conditionForRenderName(){
    if(this.props.projectDetail._stage.length > 0){
      if(this.props.projectDetail._stage[this.props.infoForUpdateRev.stageIndex]._review.length > 0){
        return this.props.projectDetail._stage[this.props.infoForUpdateRev.stageIndex]._review[this.props.infoForUpdateRev.revIndex].name;
      }
    }
    return '';
  }

  conditionForRenderCompanytoclientdate(){
    if(this.props.projectDetail._stage.length > 0){
      if(this.props.projectDetail._stage[this.props.infoForUpdateRev.stageIndex]._review.length > 0){
        return this.props.projectDetail._stage[this.props.infoForUpdateRev.stageIndex]._review[this.props.infoForUpdateRev.revIndex].companytoclientdate ? moment(this.props.projectDetail._stage[this.props.infoForUpdateRev.stageIndex]._review[this.props.infoForUpdateRev.revIndex].companytoclientdate, 'YYYY-MM-DD') : null
      }
    }
    return null;
  }

  conditionForRenderClienttocompany(){
    if(this.props.projectDetail._stage.length > 0){
      if(this.props.projectDetail._stage[this.props.infoForUpdateRev.stageIndex]._review.length > 0){
        return this.props.projectDetail._stage[this.props.infoForUpdateRev.stageIndex]._review[this.props.infoForUpdateRev.revIndex].clienttocompany ? moment(this.props.projectDetail._stage[this.props.infoForUpdateRev.stageIndex]._review[this.props.infoForUpdateRev.revIndex].clienttocompany, 'YYYY-MM-DD') : null
      }
    }
    return null;
  }


  render(){
    return(
      <div>
        <div className="row">
          <label>Nombre de la revision</label>
          <input
            value={this.conditionForRenderName()}
            onChange={(e) => {
            this.props.addRevForEdit(
              this.props.infoForUpdateRev.idRev,
              this.props.infoForUpdateRev.stageId,
              this.props.infoForUpdateRev.stageIndex,
              this.props.infoForUpdateRev.revIndex,
              {
                name: e.target.value
              }
            );
          }} type="text" className="validate" />
        </div>
        <div className="row">
          <div className="col s6">
            <label>Fecha de entrega</label>
            <DatePicker
              dateFormat="DD-MM-YYYY"
              onChange={(date) => this.props.addRevForEdit(
                this.props.infoForUpdateRev.idRev,
                this.props.infoForUpdateRev.stageId,
                this.props.infoForUpdateRev.stageIndex,
                this.props.infoForUpdateRev.revIndex,
                {
                  companytoclientdate: date
                }
              )}
              selected={this.conditionForRenderCompanytoclientdate()}
              todayButton={"Hoy"}
              isClearable={true}
              showYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={3}
            />
          </div>
          <div className="col s6">
            <label>Fecha de revision</label>
            <DatePicker
              dateFormat="DD-MM-YYYY"
              onChange={(date) => this.props.addRevForEdit(
                this.props.infoForUpdateRev.idRev,
                this.props.infoForUpdateRev.stageId,
                this.props.infoForUpdateRev.stageIndex,
                this.props.infoForUpdateRev.revIndex,
                {
                  clienttocompany: date
                }
              )}
              selected={this.conditionForRenderClienttocompany()}
              todayButton={"Hoy"}
              isClearable={true}
              showYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={3}
            />
          </div>
        </div>
      </div>
    );
  }
};

function mapStateToProps(state){
  return {
    projectDetail: state.projectDetail,
  };
};

export default connect(mapStateToProps, actions)(EditRev);
