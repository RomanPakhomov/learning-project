import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import userActions from '../../actions/user';
import generalActions from '../../actions/general';
import storyActions from '../../actions/story'
import { Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

class SnackBar extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <React.Fragment>
        <Snackbar 
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          className='snackbar-error'
          autoHideDuration={4000}
          open={Boolean(this.props.user.error || this.props.story.error || this.props.general.error)}
          onClose={this.props.generalActions.closeSnack}
          message={this.props.user.error || this.props.story.error || this.props.general.error}
          action={
            <React.Fragment>
              <IconButton size="small" aria-label="close" color="inherit" onClick={this.props.generalActions.closeSnack}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        >
        </Snackbar>
        <Snackbar 
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          className='snackbar-success'
          autoHideDuration={4000}
          open={Boolean(this.props.user.success || this.props.story.success || this.props.general.success)}
          onClose={this.props.generalActions.closeSnack}
          message={this.props.user.success || this.props.story.success || this.props.general.success}
          action={
            <React.Fragment>
              <IconButton size="small" aria-label="close" color="inherit" onClick={this.props.generalActions.closeSnack}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        >
        </Snackbar>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    ...state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    generalActions: bindActionCreators(generalActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch),
    storyActions: bindActionCreators(storyActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SnackBar);