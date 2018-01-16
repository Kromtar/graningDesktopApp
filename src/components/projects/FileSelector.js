import _ from 'lodash';
import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class FileSector extends Component {


  renderInsideDropZone({ isDragActive, isDragReject }) {
    if (isDragActive) {
      return <h4 className="drop-message">Proyecto seleccionado</h4>;
    } else if (isDragReject) {
      return <h4 className="drop-message">Error en el formato del archivo!</h4>;
    } else {
      return <h4 className="drop-message">Arrastra el projecto aquí o haz click (ZIP)...</h4>
    }
  };

  onDrop = (files) => {
    // invalid file types are not added to files object
    const file = _.map(files, ({ name, path, size, type }) => {
      return { name, path, size, type };
    });

    if (file.length > 0) {
      console.log(file);
      const fileFormat = file[0].name.split('.')[1];
      if(fileFormat === "zip"){
        this.props.addFile(file);
        this.setState({aviableFile: true})
      }

    }

  }

  renderContent(){
    if(Object.keys(this.props.fileSelected).length === 0){
      return (
        <div className="video-select-screen">
          <Dropzone
            onDrop={this.onDrop}
            accpet="application/zip"
            multiple={false}
            className="dropzone"
            activeClassName="dropzone-active"
            rejectClassName="dropzone-reject"
          >
            {this.renderInsideDropZone}
          </Dropzone>
        </div>
      );
    }else{
      return (
        <div className="row">
          <div className="col s3 offset-s3 center-align">
            <p><b>Fichero para subir:</b> {this.props.fileSelected[0].name}</p>
          </div>
          <div className="col s3 center-align">
            <a onClick={() => this.props.removeFile()} className="btn right" style={{marginTop: '10px', backgroundColor: '#ff6600'}}>
              Borrar
              <i className="material-icons right">attachment</i>
            </a>
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    fileSelected: state.fileSelected,
  };
};

export default connect(mapStateToProps, actions)(FileSector);
