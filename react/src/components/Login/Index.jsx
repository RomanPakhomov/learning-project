import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import userActions from '../../actions/user';
import { Container, TextField, Button, Typography, Checkbox, FormControlLabel, Paper } from '@material-ui/core';

class Login extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.actions.returnRegister();
  }

  render(){
    return(
      <Container maxWidth="sm" className="login">
        { this.props.user.userAuth && 
          <Redirect 
            to={{
              pathname: "/",
            }}
          />
        }
        <Typography variant="h5" component="h2" align="center" gutterBottom>
          Авторизация
        </Typography>
        { this.props.user.regResult && 
          <Paper className="success">
            <Typography>
              Регистрация прошла успешно, для входа на сайт авторизируйтесь
            </Typography>
          </Paper>}
        <form method="POST">
          <TextField 
            fullWidth 
            required 
            label="Логин" 
            variant="outlined"
            error={this.props.user['_loginError'] && !this.props.user.userLogin}
            helperText={this.props.user['_loginError'] && 'Введите e-mail'}
            value={this.props.user.userLogin && this.props.user.userLogin} 
            onChange={e => this.props.actions.saveUserAuthLoginValue(e.target.value)}
            onBlur={e => this.props.actions.validate(e.target.value, '_loginError')} />
          <TextField 
            fullWidth 
            required 
            label="Пароль" 
            type="password" 
            variant="outlined"
            autoComplete="Password" 
            error={this.props.user['_passwordError']}
            helperText={this.props.user['_passwordError'] && 'Введите пароль'}
            value={this.props.user.userPassword && this.props.user.userPassword}
            onChange={e => this.props.actions.saveUserAuthPasswordValue(e.target.value)}
            onBlur={e => this.props.actions.validate(e.target.value, '_passwordError')}/>
          <FormControlLabel
            control={
              <Checkbox value="saveUser" color="primary"
              onChange={this.props.actions.saveUserAuth}/>
            }
            label="Запомнить меня"
          />
          <Button variant="contained" color="primary"
            onClick={() => {
              this.props.actions.authorization();
              this.props.actions.validateFinal(['_loginError', '_passwordError'])}}>
            Вход
          </Button>
        </form>
      </Container>
    );
  }
};

const mapStateToProps = state => {
  return {
    ...state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);