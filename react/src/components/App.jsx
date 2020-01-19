import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import userActions from '../actions/user';
import Footer from './Shared/Footer';
import Header from './Shared/Header';
import ArticleList from './ArticleList';
import Article from './Article';
import Login from './Login';
import Registration from './Registration';
import User from './User';
import UserList from './UserList';
import SnackBar from './Shared/SnackBar';
import { Container } from '@material-ui/core';
import { Switch, Route } from 'react-router-dom';

class App extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.actions.getUserProfile();
  }

  render(){
    return (
      <React.Fragment>
        <Container className={'content'}>
          <Header />
          <Switch>
            <Route path={"/"} exact component={ArticleList}/>
            <Route path={"/story/:id"} component={Article}/>
            <Route path={"/stories/category/:id"} component={ArticleList} />
            <Route path={"/login"} component={Login} />
            <Route path={"/registration"} component={Registration}/>
            <Route path={"/user"} component={User} />
            <Route path={"/users"} exact component={UserList} />
          </Switch>
          <SnackBar />
        </Container>
        <Footer className={'footer'}/>
      </React.Fragment>
      
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
}

export default connect(mapStateToProps, mapDispatchToProps)(App);