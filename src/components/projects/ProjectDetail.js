import _ from 'lodash';
import React, { Component } from 'react';
import $ from 'jquery';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class ProjectDetail extends Component {

  componentDidMount(){
    $('#collapsible').collapsible();
  }

  dateFormat(dateIn){
    const mydate = new Date(dateIn);
    return mydate.toLocaleDateString('en-GB');
  }

  badgeRender(){
    if(this.props.projectDetailStatic.finished){
      return (
        <span style={{marginTop: '5px'}} className="new badge green" data-badge-caption=" Proyecto finalizado" />
      );
    }else{
      return (
        <span style={{marginTop: '5px'}} className="new badge blue" data-badge-caption=" Proyecto en curso" />
      );
    }
  }

  renderCollapsible(){
    if(typeof(this.props.projectDetailStatic._stage) !== "undefined"){
      if(this.props.projectDetailStatic._stage.length > 0){
        return (
          <ul id="collapsible" className="collapsible popout" data-collapsible="accordion" >
            {this.renderProjectStage()}
          </ul>
        );
      }
    }
    return <blockquote><p>No se ha creado ninguna etapa en este proyecto</p></blockquote>;
  }

  renderProjectStage(){
    return _.map(this.props.projectDetailStatic._stage, stage => {
      return (
          <li key={stage._id} style={{borderStyle: 'solid', borderWidth: '2px', borderColor: '#0066cc'}}>
            <div className="collapsible-header"><i className="material-icons">device_hub</i>{stage.name}</div>
            <div className="collapsible-body">
              <div
                className="row z-depth-1"
                style={{
                  paddingTop: '6px',
                  marginBottom: '0px',
                  borderStyle: 'solid',
                  borderColor: '#00305b',
                  borderWidth: '1px',
                  borderRadius: '10px'
                }}
              >
                {this.renderProjectRev(stage)}
              </div>
            </div>
          </li>
      );
    });
  }

  renderProjectRev(stage){
    if(stage._review.length > 0){
      return _.map(stage._review, review => {
        return (
          <div key={review._id}>
            <div className="col s2">
             <p>
               <i className="material-icons left" style={{marginRight: '8px'}}>view_quilt</i>
               <b>{review.name}</b>
             </p>
           </div>
           <div className="col s5">
             <p>Fecha entrega: {review.companytoclientdate ? this.dateFormat(review.companytoclientdate) : 'Fecha pendiente'}</p>
           </div>
           <div className="col s5">
             <p>Fecha correccion: {review.clienttocompany ? this.dateFormat(review.clienttocompany) : 'Fecha pendiente'}</p>
           </div>
         </div>
        );
      });
    } else {
      return <blockquote><p>No se ha creado ninguna revisión en esta etapa</p></blockquote>;
    }
  }

  //TODO: Dejar en un componente externo
  renderUserFromProject(){
    //Iteramos por los objetos en el array gracias a la auda de lodash
    if(this.props.projectUsers.length > 0){
      return _.map(this.props.projectUsers, field => {
        return (
          <div key={field._id}>
            <div className="row" style={{marginBottom: '0px'}}>
              <div className="col s6">
                <p>Nombre: {field.name} {field.surname}</p>
                <p>Email: {field.email}</p>
              </div>
              <div className="col s6">
                <p>Compañia: {field.company}</p>
                <a
                  onClick={async () => {
                    await this.props.getClientDetail(field._id);
                    $('ul.tabs').tabs('select_tab', 'clients');
                  }}
                  className="waves-effect waves-light btn" style={{ height: '25px', lineHeight: '26px', padding: '0 0.5rem', fontSize: 'small', backgroundColor: '#3399ff'}}>
                  <i style={{marginLeft: '8px'}} className="material-icons right">visibility</i>
                  Ver más del Cliente
                </a>
              </div>
            </div>
            <div className="divider"></div>
          </div>
        );
      });
    }else{
      return <blockquote><p>No hay clientes inscritos en este proyecto</p></blockquote>;
    }

  }

  renderDocumentSection(){
    if(this.props.projectDetailStatic.filename){
      return <div>Nombre del último archivo disponible: {this.props.projectDetailStatic.filename}</div>;
    }else{
      return <blockquote><p>No hay documentos en este proyecto actualmente</p></blockquote>;
    }
  }

  render(){

    return(
      <div>

          {/* Cuerpo con footer fijo */}
          <div style={{display: 'flex', minHeight: '91vh', flexDirection: 'column'}}>
            <main className="container" style={{flex: '1 1 auto', marginTop: '22px'}}>

              {/* Titulo */}
              <div className="card">
                <div className="card-content white-text" style={{paddingBottom: '2px', paddingTop: '10px'}}>
                  <span className="card-title">
                    <i className="material-icons left">insert_drive_file</i>
                    Detalles del Proyecto   Nº {this.props.projectDetailStatic.internalcode}
                    {this.badgeRender()}
                  </span>
                </div>
              </div>

              {/* Contenido del detalle */}
              <div style={{overflow: 'auto', maxHeight: '68vh'}}>

                  {/* General */}
                  <div
                    className="row z-depth-3"
                    style={{
                      marginLeft: '10px',
                      marginRight: '10px',
                      borderColor: '#00305b',
                      borderRadius: '12px',
                      borderWidth: '1px',
                      borderStyle: 'solid'
                    }}
                  >

                    <div className="col s6">
                      <p><b>Nombre:  </b>{this.props.projectDetailStatic.name}</p>
                      <p><b>Nº Proyecto:  </b>{this.props.projectDetailStatic.proyectnumber}</p>
                      <p><b>Nº Contrato:  </b>{this.props.projectDetailStatic.contractnumber}</p>
                      <p><b>Nº Orden de compra:  </b>{this.props.projectDetailStatic.purchaseordernumber}</p>
                    </div>
                    <div className="col s6">
                      <p><b>Fecha inicio proyecto:  </b>{this.props.projectDetailStatic.openprojectdate ? this.dateFormat(this.props.projectDetailStatic.openprojectdate) : 'Pendiente'}</p>
                      <p><b>Fecha cierre proyecto:  </b>{this.props.projectDetailStatic.closeprojectdate ? this.dateFormat(this.props.projectDetailStatic.closeprojectdate) : 'Pendiente'}</p>
                      <p><b>Plazo (en días):  </b>{this.props.projectDetailStatic.term}</p>
                    </div>

                  </div>

                  {/* Etapas */}
                  <div
                    className="row z-depth-3"
                    style={{
                      marginLeft: '10px',
                      marginRight: '10px',
                      paddingTop: '6px',
                      borderColor: '#00305b',
                      borderRadius: '12px',
                      borderWidth: '1px',
                      borderStyle: 'solid'
                    }}
                  >

                    <div className="col s12">
                    <p><b>Avance del proyecto:</b></p>
                    <div className="divider" style={{marginBottom: '5px'}}></div>
                      {this.renderCollapsible()}
                    </div>

                  </div>

                  {/* Ficheros */}
                  <div
                    className="row z-depth-3"
                    style={{
                      marginLeft: '10px',
                      marginRight: '10px',
                      paddingTop: '6px',
                      borderColor: '#00305b',
                      borderRadius: '12px',
                      borderWidth: '1px',
                      borderStyle: 'solid'
                    }}
                  >

                    <div className="col s12">
                    <p><b>Documentos del proyecto:</b></p>
                    <div className="divider" style={{marginBottom: '5px'}}></div>
                      <div style={{marginTop: '10px', marginBottom: '10px'}}>
                        {this.renderDocumentSection()}
                      </div>
                    </div>

                  </div>

                  {/* Clientes */}
                  <div
                    className="row z-depth-3"
                    style={{
                      marginLeft: '10px',
                      marginRight: '10px',
                      borderColor: '#00305b',
                      borderRadius: '12px',
                      borderWidth: '1px',
                      borderStyle: 'solid'

                    }}
                  >
                    <div className="col s12">
                      <p><b>Clientes inscritos en este proyecto:</b></p>
                      <div className="divider" style={{marginBottom: '5px'}}></div>
                      {this.renderUserFromProject()}
                    </div>
                  </div>

              </div>




            </main>

            {/* Barra de nav */}
            <footer>
              <div className="divider" style={{marginBottom: '15px'}}></div>
              <div className="row">
                <div className="col s6 left-align">
                  <a onClick={() => {
                    this.props.windowProjectTabViewList();
                  }} className="waves-effect waves-light btn-flat">
                    Cerrar
                  </a>
                </div>
                <div className="col s6 right-align">
                  <a onClick={() => this.props.windowProjectTabViewEdit()} className="waves-effect waves-light btn" style={{backgroundColor: '#3399ff'}}>
                    Editar proyecto
                    <i className="material-icons right">mode_edit</i>
                  </a>
                </div>
              </div>
            </footer>

          </div>

      </div>
    );
  }
};

function mapStateToProps(state){
  return {
    projectDetailStatic: state.projectDetailStatic,
    projectUsers: state.projectUsers
  };
};

export default connect(mapStateToProps, actions)(ProjectDetail);
