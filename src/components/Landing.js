import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginForm from './LoginForm';
import MainPanel from './MainPanel';

class Landing extends Component {

  renderLanding(){
    if(this.props.loginUserState){
      return (
        <MainPanel />
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
