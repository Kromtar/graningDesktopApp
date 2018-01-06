//Seccion de listado de clientes
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import { Button, Modal } from 'react-materialize';
import * as actions from '../../actions';

import NewUserContent from './NewUser';

class UsersList extends Component {


  render(){

    const onClickReload = () => {
      this.props.fetchClients();
    }

    const test = () => {
      this.props.test();
    }

    const data = this.props.clients;

    const filterStyle = {
      width: '100%',
      height: '25px',
      marginTop: '8px',
      marginBottom: '0px'
    };

    const columns = [{
        Header: 'Empresa',
        maxWidth: 150,
        accessor: 'company', // String-based value accessors!
        Filter: ({filter, onChange}) => (
          <input
            onChange={event => onChange(event.target.value)}
            style={filterStyle}
          />
        )
      }, {
        Header: 'Nombre',
        id: 'name',
        accessor: d => d.name + ' ' + d.surname,
        Filter: ({filter, onChange}) => (
          <input
            onChange={event => onChange(event.target.value)}
            style={filterStyle}
          />
        )
      }, {
        Header: 'Mail', // Required because our accessor is not a string
        accessor: 'email',
        Filter: ({filter, onChange}) => (
          <input
            onChange={event => onChange(event.target.value)}
            style={filterStyle}
          />
        )
      }, {
        Heder: 'Button',
        maxWidth: 120,
        sortable: false,
        filterable: false,
        Cell: row => (
          <a className="waves-effect waves-light btn" style={{ height: '25px', lineHeight: '26px', padding: '0 0.5rem', fontSize: 'small'}}>
            <i className="material-icons right">visibility</i>
            Ver mas
          </a>
        )
      }]

      return(
        <div className="container" style={{ marginTop:  '30px'}}>
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <span className="card-title">Lista de clientes</span>
            </div>
          </div>
          <ReactTable
            data={data}
            columns={columns}
            defaultPageSize = {12}
            filterable
            noDataText="No hay datos :("
            className="-striped -highlight"
          />
          <Button floating fab='vertical' icon='filter_list' className='red' large style={{bottom: '45px', right: '24px'}}>
            <Button onClick={ () => onClickReload()} floating icon='refresh' className='blue'/>
            <Modal
            	header='Añade un nuevo Cliente'
              modalOptions={{dismissible: false}}
              trigger={<Button floating icon='add' className='green'/>}
              actions={[
                <div className="row" style={{marginBottom: '0px'}}>
                  <div className="col s6 left-align">
                    <Button waves='light' className='red' modal='close' flat>Cerrar</Button>
                  </div>
                  <div className="col s6 right-align">
                    <Button onClick={() => test()} waves='light' className='green' modal='close' flat>Siguiente</Button>
                  </div>
                </div>
              ]}
            	fixedFooter
            >
            	<NewUserContent />
            </Modal>
          </Button>
        </div>
      );
    }
};

function mapStateToProps(state){
  return {
    clients: state.clients
  };
};

export default connect(mapStateToProps, actions)(UsersList);
