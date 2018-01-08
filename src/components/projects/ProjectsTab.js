import React, { Component } from 'react';
import { connect } from 'react-redux';

import ProjectsList from './ProjectsList';
import ProjectDetail from './ProjectDetail';

class ProjectsTab extends Component {

  windowProjectDetailRender(){
    if(this.props.window_ProjectTab === 'list'){
      return (
        <ProjectsList />
      );
    } else if (this.props.window_ProjectTab === 'detail'){
      return (
        <ProjectDetail />
      );
    }
  }

  render(){
      return(
        <div>
          {this.windowProjectDetailRender()}
        </div>
      );
    }
  };

  function mapStateToProps(state){
    return {
      window_ProjectTab: state.window_ProjectTab
    };
  };

export default connect(mapStateToProps)(ProjectsTab);
