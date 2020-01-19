import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import userActions from '../../actions/user';
import generalActions from '../../actions/general';
import storyActions from '../../actions/story'
import { Link } from 'react-router-dom';
import { Box, List, ListItem, ListItemText, Divider, Paper } from '@material-ui/core';
import Like from '../Shared/Like';

class SideBar extends React.Component{
  constructor(props){
    super(props);
  }

  render(){

    //const categoryId = this.props.match.params.id

    return(
      <Paper>
        <List>
          <Link to={"/"} onClick={() => this.props.generalActions.fetchArticles()}>
              < ListItem >
              <ListItemText>Лента</ListItemText>
            </ListItem>
          </Link>
          <Divider />
          {
            this.props.story.categories.map((item, i) => {
              return(
                <Link to={`/stories/category/${item.id}`} key={i} 
                  onClick={() => {this.props.generalActions.fetchArticles(item.id)}}>
                  <ListItem >
                    <ListItemText>{item.name}</ListItemText>
                  </ListItem>
                </Link>
              )
            })
          }
          {
            this.props.user.userAuth &&
              <Box>
                <Divider />
                <Link to={"/users"}>
                    < ListItem >
                    <ListItemText>Пользователи</ListItemText>
                  </ListItem>
                </Link>
              </Box>
          }
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
    generalActions: bindActionCreators(generalActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch),
    storyActions: bindActionCreators(storyActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);