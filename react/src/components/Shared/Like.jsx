import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import userActions from '../../actions/user';
import generalActions from '../../actions/general';
import storyActions from '../../actions/story'
import { Checkbox, FormControlLabel, Typography } from '@material-ui/core';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

class Like extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      likes: props.likes.length,
      checked: false,
    }
    this.changeStatusAndCount = this.changeStatusAndCount.bind(this);
  }

  changeStatusAndCount(){
    if(this.state.checked === true){
      this.setState((prevState) => {
        return{
          likes: prevState.likes - 1,
          checked: false
        }
      });
    } else {
      this.setState((prevState) => {
        return{
          likes: prevState.likes + 1,
          checked: true
        }
      });
    }
  }

  componentDidMount(){
    this.setState({
      checked: Boolean(this.props.likes.find( item => item.userId === this.props.user.userId))
    })
  }

  render(){
    return(
      <FormControlLabel
      control={
        <Checkbox
          icon={<FavoriteBorder />}
          checkedIcon={<Favorite />}
          value={this.state.likes}
          checked={this.props.active === true ? this.state.checked : false}
          onClick={() => {
            if(this.props.active === true && this.props.user.userAuth !== false){
              this.props.userActions.like(this.props.storyId)
              this.changeStatusAndCount()
            }
            else{
              console.log(' Вам нельзя ставить лайки ')
            }
          }}
        />
      }
      label={this.state.likes}
      />
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

export default connect(mapStateToProps, mapDispatchToProps)(Like);