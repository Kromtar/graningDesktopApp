import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Line, Circle } from 'rc-progress';
import * as actions from '../../actions';

class ProjectFileUplaod extends Component {

  renderContent(){
    if(this.props.window_UploadConsole.content === 'finished'){
      return (
        <div>
          <div className="col s12" style={{marginTop: '25px', marginBottom: '25px'}}>
            <div>Porceso terminado :)</div>
          </div>
          <div className="col s12" style={{marginTop: '10px', marginBottom: '10px'}}>
            <div className="col s6 offset-s6 right-align">
              <a
                onClick={() => this.props.closeWindowUploadConsole()}
                className={"waves-effect waves-light btn green"}
              >
                Cerrar panel
                <i className="material-icons right"></i>
              </a>
            </div>
          </div>
        </div>
      );
    }
  }

  render(){

      //TODO: Pasar a async y comprobar que recargue
      if(this.props.window_UploadConsole.content === 'linkReady'){
        this.props.sendLinkProject();
        this.props.getProjectDetail(this.props.projectDetailStatic._id);
      }

      return(
        <div className="container" style={{ marginTop:  '30px'}}>

          {/* Titulo */}
          <div className="card blue-grey darken-1">
            <div className="card-content white-text" style={{paddingBottom: '2px', paddingTop: '10px'}}>
              <span className="card-title">Subiendo Fichero</span>
            </div>
          </div>

          <div style={{overflow: 'auto', maxHeight: '68vh'}}>

            <div className="col s12">
              <div className="row z-depth-1" style={{paddingTop: '20px'}}>
                No apaguez el programa mientras se procesa el proyecto....
                <div style={{ margin: 10 }}>
                  <Line strokeWidth="2" percent={this.props.window_UploadConsole.progress} />
                  {this.renderContent()}
                </div>
              </div>
            </div>

          </div>
        </div>
      );
    }
  };

  function mapStateToProps(state){
    return {
      window_UploadConsole: state.window_UploadConsole,
      projectDetailStatic: state.projectDetailStatic
    };
  };

export default connect(mapStateToProps, actions)(ProjectFileUplaod);
