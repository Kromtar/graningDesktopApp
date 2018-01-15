import React from 'react';

const removeProjectFromUserModal = (props) => {
  return (
    <div className="modal-content" style={{paddingBottom: '3px'}}>
      <h5 className="header">Confirmación</h5>
      <div className="row">
        <div style={{height: '25px'}}/>
        <div className="col s12">
          ¿ Seguro que quieres remover el acceso de {props.name} {props.surname} del proyecto: {props.projectName}, con Codigo Graning: {props.projectInternalcode} ?
        </div>
      </div>

      {/* Footer modal*/}
      <div className="divider"></div>
      <div className="modal-footer" style={{marginTop: '25px'}} >
        <a
          onClick={() => props.onClose()}
          className="modal-action modal-close waves-effect waves-green btn-flat">
          Cancelar
        </a>
        <button
          onClick={() => props.onConfirm()}
          className="btn right white-text"
          style={{backgroundColor: '#2a6443',color: '#fff'}}
        >
          Confirmar
          <i className="material-icons right">done</i>
        </button>
      </div>
    </div>
  );
};

export default removeProjectFromUserModal;
