import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import storyActions from '../../actions/story';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';

class ModalDeleteStory extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
      <Dialog
        open={this.props.story.modalDelete}
        onClose={this.props.storyActions.modalDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Вы уверены что хотите удалить историю?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            При удалении истории, она будет навсегда утеряна. Возможность восстановить историю отсутствует
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={this.props.storyActions.modalDeleteClose} color="primary">
            Не удалять
          </Button>
          <Button
            onClick={() => {
              this.props.storyActions.modalDeleteClose()
              this.props.storyActions.deleteStory(this.props.story.storyDeletedId)}} 
            color="secondary" autoFocus>
              Удалить навсегда
          </Button>
        </DialogActions>
      </Dialog>
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
    storyActions: bindActionCreators(storyActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalDeleteStory);