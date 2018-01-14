import React from 'react';

const removeProjectFromUserModal = (props) => {
  return (
    <div className="modal-content" style={{paddingBottom: '3px'}}>
      <h5 className="header">Confirmacion</h5>
      <div className="row">
        <div style={{height: '25px'}}/>
        <div className="col s12">
          ¿ Seguro que quieres remover el acceso de {props.name} {props.surname} del proyecto: {props.projectName}, Cod Graning: {props.projectInternalcode} ?
        </div>
      </div>

      {/* Footer modal*/}
      <div className="divider"></div>
      <div className="modal-footer" style={{marginTop: '25px'}} >
        <a
          onClick={() => props.onClose()}
          className="modal-action modal-close waves-effect waves-green btn-flat">
          Cerrar
        </a>
        <button
          onClick={() => props.onConfirm()}
          className="teal btn-flat right white-text"
        >
          Confirmar
          <i className="material-icons right">done</i>
        </button>
      </div>
    </div>
  );
};

export default removeProjectFromUserModal;
