import React, { Component } from 'react';

class Header extends Component {
  renderContent(){
      return [
        <li key="1">Op1</li>,
        <li key="2">Op2</li>,
        <li key="3">Op3</li>
      ];
  }

  render(){
    return(
      <nav>
        <div className="nav-wapper">
          GraningApp
          <ul className="right">
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;
