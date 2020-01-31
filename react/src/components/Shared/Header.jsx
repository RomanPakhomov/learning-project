import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import userActions from '../../actions/user';
import generalActions from '../../actions/general';
import { Toolbar, Box, Typography, Button, Link as LinkM, InputBase, IconButton, Menu, MenuItem } from '@material-ui/core';
import { Search, AccountCircle } from '@material-ui/icons';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <React.Fragment>
        <Toolbar>
          <Box className="main-logo-wrap">
            <Link to="/" onClick={() => this.props.generalActions.fetchArticles()}>
              <Box className="main-logo">
              </Box>
            </Link>
          </Box>
          {this.props.user.userAuth ? 
              <div>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={e => {
                    this.props.generalActions.openMenu(e.currentTarget);
                  }}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={this.props.general.anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={this.props.general.open}
                  onClose={this.props.generalActions.closeMenu}
                >
                  <Link to="/user" onClick={this.props.generalActions.closeMenu}>
                    <MenuItem>
                      Профиль
                    </MenuItem>
                  </Link>
                    { this.props.router &&
                      this.props.router.location.pathname === '/user' ||
                      this.props.router.location.pathname === '/user/info' ||
                      this.props.router.location.pathname === '/user/add-story' ||
                      this.props.router.location.pathname === '/users' ?
                      <Link 
                        to="/" 
                        onClick={()=>{
                          this.props.generalActions.closeMenu()
                          this.props.userActions.userLogout()
                          //this.props.generalActions.fetchArticles()
                        }}>
                        <MenuItem>
                          Выход
                        </MenuItem>
                      </Link>
                      :
                      <MenuItem onClick={()=>{
                        this.props.generalActions.closeMenu()
                        this.props.userActions.userLogout()}}>
                        Выход
                      </MenuItem>
                      
                } 
                </Menu>
              </div>
            : 
              <div>
                <Link to="/login">
                  <Button size="small" align="right">
                    Вход
                  </Button>
                </Link>
                <Link to="/registration">
                  <Button size="small" align="right">
                    Регистрация
                  </Button>
                </Link>
              </div>
          }
        </Toolbar>
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
    userActions: bindActionCreators(userActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);