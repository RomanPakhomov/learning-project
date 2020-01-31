import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import userActions from '../../actions/user';
import { Link } from 'react-router-dom';
import { Dialog, DialogTitle, DialogActions, Button, Box } from '@material-ui/core'

class ModalExit extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <Box>
        <Dialog
          open={this.props.user.modalExit}
          onClose={this.props.userActions.modalExitClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Вы желаете выйти из личного кабинета?"}</DialogTitle>
          <DialogActions>
            <Button variant="contained" onClick={this.props.userActions.modalExitClose} color="primary">
              Не выходить
            </Button>
            <Link to={'/'}
              onClick={() => {
                this.props.userActions.modalExitClose()
                this.props.userActions.userLogout()}} 
            >
              <Button  
                color="secondary" autoFocus>
                Выйти
              </Button>
            </Link>
          </DialogActions>
        </Dialog>
      </Box> 
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
    userActions: bindActionCreators(userActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalExit);