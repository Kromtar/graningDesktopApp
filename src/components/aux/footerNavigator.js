import React from 'react';

const footerNavigator = (props) => {

  return (
    <footer>
      <div className="divider" style={{marginBottom: '15px'}}></div>
      <div className="row">
        <div className="col s6 left-align">
          <a
            onClick={() => props.onLeftBtn()}
            className="waves-effect waves-light btn-flat"
          >
            {props.leftLabel}
          </a>
        </div>
        <div className="col s6 right-align">
          <a
            onClick={() => props.onRightBtn()}
            className={"waves-effect waves-light btn " + props.rightColor}
          >
            {props.rightLabel}
            <i className="material-icons right">{props.rightIcon}</i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default footerNavigator;
