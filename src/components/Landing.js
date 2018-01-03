import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginForm from './LoginForm';

class Landing extends Component {


  renderLanding(){
    if(this.props.loginUserState){
      return (
        <div>
          Estas logiado
        </div>
      );
    } else {
      return (
        <LoginForm/>
      );
    }
  }

  render() {
    return (
      <div>
        {this.renderLanding()}
      </div>
    );
  }


};

function mapStateToProps(state){
  return { loginUserState: state.loginUserState };
};

export default connect(mapStateToProps)(Landing);
