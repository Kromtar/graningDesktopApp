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
          <ul id="collapsible" className="collapsible popout" data-collapsible="accordion">
            {this.renderProjectStage()}
          </ul>
        );
      }
    }
    return <blockquote><p>No se ha creado ninguna etapa de proyecto aun</p></blockquote>;
  }

  renderProjectStage(){
    return _.map(this.props.projectDetailStatic._stage, stage => {
      return (
          <li key={stage._id}>
            <div className="collapsible-header"><i className="material-icons">assistant_photo</i>{stage.name}</div>
            <div className="collapsible-body">
              <div className="row z-depth-1" style={{paddingTop: '6px', marginBottom: '0px'}}>
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
             <p><b>{review.name}</b></p>
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
      return <blockquote><p>No se ha creado ninguna Rev. en esta etapa aun</p></blockquote>;
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
                <a onClick={() => console.log('Cargar info de usuario')} className="waves-effect waves-light btn" style={{ height: '25px', lineHeight: '26px', padding: '0 0.5rem', fontSize: 'small'}}>
                  <i className="material-icons right">account_circle</i>
                  Ver mas del Cliente
                </a>
              </div>
            </div>
            <div className="divider"></div>
          </div>
        );
      });
    }else{
      return <blockquote><p>No hay Clientes asignados a este proyecto</p></blockquote>;
    }

  }

  render(){

    return(
      <div>

          {/* Cuerpo con footer fijo */}
          <div style={{display: 'flex', minHeight: '91vh', flexDirection: 'column'}}>
            <main className="container" style={{flex: '1 1 auto', marginTop: '23px'}}>

              {/* Titulo */}
              <div className="card blue-grey darken-1">
                <div className="card-content white-text" style={{paddingBottom: '2px', paddingTop: '10px'}}>
                  <span className="card-title">
                    Detalles del Proyecto   Nº {this.props.projectDetailStatic.internalcode}
                    {this.badgeRender()}
                  </span>
                </div>
              </div>

              {/* Contenido del detalle */}
              <div style={{overflow: 'auto', maxHeight: '68vh'}}>

                  {/* General */}
                  <div className="row z-depth-1" style={{marginLeft: '10px', marginRight: '10px'}}>

                    <div className="col s6">
                      <p><b>Nombre:  </b>{this.props.projectDetailStatic.name}</p>
                      <p><b>Nº Proyecto:  </b>{this.props.projectDetailStatic.proyectnumber}</p>
                      <p><b>Nº Contrato:  </b>{this.props.projectDetailStatic.contractnumber}</p>
                      <p><b>Nº Orden de compra:  </b>{this.props.projectDetailStatic.purchaseordernumber}</p>
                    </div>
                    <div className="col s6">
                      <p><b>Fecha inicio proyecto:  </b>{this.props.projectDetailStatic.openprojectdate ? this.dateFormat(this.props.projectDetailStatic.openprojectdate) : 'Pendiente'}</p>
                      <p><b>Fecha cierre proyecto:  </b>{this.props.projectDetailStatic.closeprojectdate ? this.dateFormat(this.props.projectDetailStatic.closeprojectdate) : 'Pendiente'}</p>
                      <p><b>Plazo (en dias):  </b>{this.props.projectDetailStatic.term}</p>
                    </div>

                  </div>

                  {/* Etapas */}
                  <div className="row z-depth-1" style={{marginLeft: '10px', marginRight: '10px', paddingTop: '6px'}}>

                    <div className="col s12">
                    <p><b>Avance del proyecto:</b></p>
                    <div className="divider" style={{marginBottom: '5px'}}></div>
                      {this.renderCollapsible()}
                    </div>

                  </div>

                  {/* Ficheros */}
                  <div className="row z-depth-1" style={{marginLeft: '10px', marginRight: '10px', paddingTop: '6px'}}>

                    <div className="col s12">
                    <p><b>Documentos del proyecto:</b></p>
                    <div className="divider" style={{marginBottom: '5px'}}></div>
                      Aqui van los ficheros
                    </div>

                  </div>

                  {/* Clientes */}
                  <div className="row z-depth-1" style={{marginLeft: '10px', marginRight: '10px'}}>
                    <div className="col s12">
                      <p><b>Clientes que ven este proyecto:</b></p>
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
                  <a onClick={() => this.props.windowProjectTabViewEdit()} className="waves-effect orange waves-light btn">
                    Editar informacion del proyecto
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
