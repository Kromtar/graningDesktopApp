import React from 'react';

const deleteClientConfirmModal = (props) => {
  return (
    <div className="modal-content" style={{paddingBottom: '3px'}}>
      <h5 className="header">Confirmación</h5>
      <div className="row">
        <div style={{height: '25px'}}/>
        <div className="col s12">
          ¿ Seguro que quieres eliminar al cliente {props.name} {props.surname} ?
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
        <a
          onClick={() => props.onConfirm()}
          className="btn right white-text"
          style={{backgroundColor: '#ff6600',color: '#fff'}}>
          Confirmar
          <i className="material-icons right">delete</i>
        </a>
      </div>
    </div>
  );
};

export default deleteClientConfirmModal;
