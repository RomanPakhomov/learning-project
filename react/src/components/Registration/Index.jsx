import React from 'react';
import { Redirect } from 'react-router-dom';
import { Container, TextField, Button, Typography, Checkbox, FormControlLabel, Paper } from '@material-ui/core';
import userActions from '../../actions/user';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Registration extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <Container maxWidth="sm" className="registration">
        { this.props.user.userReg && 
          <Redirect 
            to={{
              pathname: "/login",
            }}
          />
        }
        <Typography variant="h5" component="h2" align="center" gutterBottom>
          Регистрация
        </Typography>
        <form method="POST">
          <TextField 
            required 
            fullWidth 
            label="Имя"
            variant="outlined"
            value={this.props.user.userName && this.props.user.userName}
            error={this.props.user['_nameRegError']}
            helperText={this.props.user['_nameRegError'] && 'Укажите имя'}
            onChange={e => this.props.actions.saveUserRegNameValue(e.target.value)}
            onBlur={e => this.props.actions.validate(e.target.value, '_nameRegError')} />
          <TextField 
            fullWidth 
            id="surname" 
            label="Фамилия"
            variant="outlined"
            value={this.props.user.userSurname && this.props.user.userSurname}
            onChange={e => this.props.actions.saveUserRegSurnameValue(e.target.value)} />
          <TextField 
            fullWidth           
            label="День рождения" 
            type="date" 
            InputLabelProps={{shrink: true,}}
            variant="outlined"
            onChange={e =>this.props.actions.saveUserRegBirthDateValue(e.target.value)} 
            />
          <TextField 
            fullWidth 
            required 
            id="login" 
            label="Логин (e-mail)"
            variant="outlined"
            value={this.props.user.userLogin && this.props.user.userLogin}
            error={this.props.user['_loginRegError']}
            helperText={this.props.user['_loginRegError'] && 'Укажите e-mail'}
            onBlur={e => this.props.actions.validate(e.target.value, '_loginRegError')}
            onChange={e => this.props.actions.saveUserRegLoginValue(e.target.value)} 
            />
          <TextField 
            fullWidth 
            required 
            id="password" 
            label="Пароль" 
            type="password" 
            autoComplete="Password"
            variant="outlined"
            value={this.props.user.userRegPassword && this.props.user.userRegPassword}
            error={this.props.user['_passwordRegError']}
            helperText={this.props.user['_passwordRegError'] && 'Укажите пароль'}
            onBlur={e => this.props.actions.validate(e.target.value, '_passwordRegError')}
            onChange={e => this.props.actions.saveUserRegPasswordValue(e.target.value)} 
            />
          <TextField 
            fullWidth  
            required 
            id="password-second" 
            label="Повтор пароля" 
            type="password" 
            autoComplete="Password"
            variant="outlined"
            value={this.props.user.userRegPassword2 && this.props.user.userRegPassword2}
            error={this.props.user['_password2RegError']}
            helperText={this.props.user['_password2RegError'] && 'Повторите пароль'}
            onBlur={e => this.props.actions.validate(e.target.value, '_password2RegError')}
            onChange={e => this.props.actions.saveUserRegPassword2Value(e.target.value)} 
            />
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => {
              this.props.actions.registration()
              this.props.actions.validateFinal(['_loginRegError', '_passwordRegError', '_password2RegError', '_nameRegError'])}}>
            Зарегистрироваться
          </Button>
        </form>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(userActions, dispatch)
  }
};

const Wrapped = connect(mapStateToProps, mapDispatchToProps)(Registration);

export default Wrapped;