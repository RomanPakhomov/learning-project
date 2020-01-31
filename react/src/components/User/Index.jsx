import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { Container, Grid, Box } from '@material-ui/core';
import userActions from '../../actions/user';
import { Switch, Route } from 'react-router-dom';
import UserSideBar from './UserSideBar.jsx';
import UserChangeInfo from './UserChangeInfo.jsx';
import UserCreateStory from './UserCreateStory.jsx';
import UserStories from './UserStories.jsx';
import UserChangeStory from './UserChangeStory.jsx';
import ModalExit from './UserExitModal';
import ModalDelete from './UserDeleteStoryModal';

class User extends React.Component{
  constructor(props){
    super(props);
  }

  render(){

    const {path} = this.props.match;

    return(
      <Box>
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={5}>
              <UserSideBar />
            </Grid>
            <Grid item xs={7}>
              <Switch>
                <Route path={path} exact component={UserStories} />
                <Route path={`${path}/info`} component={UserChangeInfo} />
                <Route path={`${path}/add-story`} component={UserCreateStory} />
                <Route path={`${path}/change-story/:id`} component={UserChangeStory} />
                    {/* <Route path={"/user/stories"} exact component={UserStories} /> */}
              </Switch>
            </Grid>
          </Grid>
        </Container>
        <ModalExit/>
        <ModalDelete/>
      </Box>
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
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(User));