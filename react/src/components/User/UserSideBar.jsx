import React from 'react';
import { bindActionCreators } from 'redux';
import userActions from '../../actions/user';
import { Link } from 'react-router-dom';
import { List, ListSubheader, ListItem, ListItemIcon, Link as LinkM, ListItemText, Paper, Button } from '@material-ui/core';
import { PermIdentity, LocalPlay, Create, ExitToApp } from '@material-ui/icons';
import { connect } from 'react-redux';


class UserSideBar extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <Paper>
        <List 
          component="nav"
          aria-labelledby="nested-list-subheader"
          className={'user-sidebar'}
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Привет {this.props.user.userName}!
            </ListSubheader>
          }
        >
          <Link to="/user">
            <ListItem button>
              <ListItemIcon>
                <LocalPlay />
              </ListItemIcon>
              <ListItemText primary="Мои истории"/>
            </ListItem>
          </Link>
          <Link to="/user/add-story">
            <ListItem button>
              <ListItemIcon>
                <Create />
              </ListItemIcon>
              <ListItemText primary="Написать историю"/>
            </ListItem>
          </Link>
          <Link to="/user/info">
            <ListItem button>
              <ListItemIcon>
                <PermIdentity />
              </ListItemIcon>
              <ListItemText primary="Редактировать профиль"/>
            </ListItem>
          </Link>
          <ListItem button  onClick={this.props.userActions.modalExitOpen}>
            <ListItemIcon>
              <ExitToApp/>
            </ListItemIcon>
            <ListItemText primary="Выйти"/>
          </ListItem>
        </List>
      </Paper>
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
    userActions: bindActionCreators(userActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserSideBar);