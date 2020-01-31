import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import userActions from '../../actions/user';
import { Typography, Box, TextField, Button } from '@material-ui/core';

class UserChangeInfo extends React.Component{
  constructor(props){
    super(props);
  }

  render(){    
    
    return(
      <Box>
        <Box className="change-user">
          <Typography variant="h5" component="h2" align="left" gutterBottom>
            Редактирование личной информации
          </Typography>
          <TextField 
            fullWidth 
            id="name" 
            label="Имя"
            variant="outlined"
            className="change-user-input-block"
            value={this.props.user.newUserName && this.props.user.newUserName}
            error={this.props.user['_nameNewError']}
            helperText={this.props.user['_nameNewError'] && 'Укажите имя'}
            onBlur={e => this.props.actions.validate(e.target.value, '_nameNewError')}
            onChange={e => this.props.actions.saveUserNewNameValue(e.target.value)} />
          <TextField 
            fullWidth 
            id="surname" 
            label="Фамилия"
            variant="outlined"
            className="change-user-input-block"
            error={this.props.user['_surnameNewError']}
            helperText={this.props.user['_surnameNewError'] && 'Укажите фамилию'}
            onBlur={e => this.props.actions.validate(e.target.value, '_surnameNewError')}
            onChange={e => this.props.actions.saveUserNewSurnameValue(e.target.value)} 
            value={this.props.user.newUserSurname && this.props.user.newUserSurname}/>
          <TextField 
            fullWidth 
            InputLabelProps={{shrink: true,}}
            required label="День рождения" 
            type="date" 
            id="birthDate"
            variant="outlined"
            className="change-user-input-block"
            onChange={e =>this.props.actions.saveUserNewBirthDateValue(e.target.value)} 
            />
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => {
              this.props.actions.updateUserInfo()
              this.props.actions.validateFinal(['_nameNewError', '_surnameNewError'])}}>
            Обновить профиль
          </Button>
        </Box>
        <br/>
        <br/>
        <Box className="change-user">
          <Typography variant="h5" component="h2" align="left" gutterBottom>
            Изменение пароля
          </Typography>
          <TextField 
            fullWidth
            type="password"
            id="old-password"
            label="Настойщий пароль"
            variant="outlined"
            className="change-user-input-block"
            error={this.props.user['_passwordOldError']}
            value={this.props.user.userOldPassword && this.props.user.userOldPassword}
            helperText={this.props.user['_passwordOldError'] && 'Укажите действующий пароль'}
            onBlur={e => this.props.actions.validate(e.target.value, '_passwordOldError')}
            onChange={e =>this.props.actions.saveUserNewPasswordOldValue(e.target.value)} 
          />
          <TextField 
            fullWidth 
            id="password" 
            label="Новый пароль" 
            type="password" 
            autoComplete="Password"
            variant="outlined"
            className="change-user-input-block"
            error={this.props.user['_passwordNewError']}
            value={this.props.user.userNewPassword && this.props.user.userNewPassword}
            helperText={this.props.user['_passwordNewError'] && 'Укажите новый пароль'}
            onBlur={e => this.props.actions.validate(e.target.value, '_passwordNewError')}
            onChange={e => this.props.actions.saveUserNewPasswordValue(e.target.value)} />
          <TextField 
            fullWidth  
            id="password-second" 
            label="Повтор пароля" 
            type="password" 
            variant="outlined"
            className="change-user-input-block"
            error={this.props.user['_password2NewError']}
            value={this.props.user.userNewPassword2 && this.props.user.userNewPassword2}
            helperText={this.props.user['_password2NewError'] && 'Повторите новый пароль'}
            onBlur={e => this.props.actions.validate(e.target.value, '_password2NewError')}
            autoComplete="Password"
            onChange={e => this.props.actions.saveUserNewPassword2Value(e.target.value)}  />
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => {
              this.props.actions.updatePassword
              this.props.actions.validateFinal(['_passwordOldError', '_passwordNewError', '_password2NewError'])}}>
            Обновить пароль
          </Button>
        </Box>
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
    actions: bindActionCreators(userActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserChangeInfo);