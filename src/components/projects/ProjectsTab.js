import React, { Component } from 'react';
import { connect } from 'react-redux';

import ProjectsList from './ProjectsList';
import ProjectDetail from './ProjectDetail';
import ProjectEdit from './ProjectEdit';
import ProjectFileUplaod from './ProjectFileUplaod';

class ProjectsTab extends Component {

  windowProjectDetailRender(){
    if(this.props.window_ProjectTab === 'list'){
      return (
        <ProjectsList />
      );
    } else if (this.props.window_ProjectTab === 'detail'){
      if(this.props.window_UploadConsole.state === 'open'){
        return (
          <ProjectFileUplaod />
        );
      }else{
        return (
          <ProjectDetail />
        );
      }

    } else if (this.props.window_ProjectTab === 'edit'){
      return (
        <ProjectEdit />
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
      window_ProjectTab: state.window_ProjectTab,
      window_UploadConsole: state.window_UploadConsole
    };
  };

export default connect(mapStateToProps)(ProjectsTab);
