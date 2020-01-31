import React from 'react';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import userActions from '../../actions/user';
import generalActions from '../../actions/general';
import Like from '../Shared/Like';
import { Container, Typography, Card, CardContent, Box, TextField, Button, List, ListItem, ListItemAvatar,ListItemText, Divider, Avatar } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import image from '../../img/image.jpg';

class Article extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      story: null,
      comments: [],
      likes: [],
      comment: '',
      getLikes: false
    }

    this.fetchStory = this.fetchStory.bind(this);
    this.fetchComments = this.fetchComments.bind(this);
    this.fetchLikes = this.fetchLikes.bind(this);
    this.changeComment = this.changeComment.bind(this);
    this.createComment = this.createComment.bind(this);
  }

  async fetchStory(storyId){
    try{
      const story = await axios.get('http://localhost:5000/story',{
        params: {
          storyId: storyId
        }
      });
      console.log(story)
      this.setState({
        story: story.data
      })
    } catch(e) {
      console.error('Ошбика получения истории');
    }  
  }

  async fetchComments(storyId){
    try{
      const comments = await axios.get('http://localhost:5000/story/comments',{
        params: {
          storyId: storyId
        }
      });
      console.log(comments)
      this.setState({
        comments: comments.data
      })
    } catch(e) {
      console.error('Ошбика получения комментариев истории', e.message);
    }  
  }

  async fetchLikes(storyId){
    try{
      const result = await axios.get('http://localhost:5000/story/likes',{
        params: {
          storyId: storyId
        }
      });
      console.log('likes ', result.data)
      this.setState({
        likes: result.data,
        getLikes: true
      })
    } catch(e) {
      console.error('Ошбика получения лайков истории', e.message);
    }  
  }

  async createComment(){
    const storyId = this.props.match.params.id;
    const comment = this.state.comment;
    const token = sessionStorage.getItem('token');
    const newComments = [...this.state.comments, {
      content: comment,
      userName: `${this.props.user.userName} ${this.props.user.userSurname}`,
      createdAt: new Date(),
    }];
    try {
      await axios.post('http://localhost:5000/user/new-comment',
        {
          storyId: storyId,
          comment: comment
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        this.setState({
          comments: newComments,
          comment: ''
        })
    } catch(e) {
      console.log('Ошибка добавления комментария', e.message)
    }
    
  }

  changeComment(value){
    this.setState({comment: value})
  }

  componentDidMount(){
    const storyId = this.props.match.params.id;
    this.fetchStory(storyId);
    this.fetchComments(storyId);
    this.fetchLikes(storyId);
  }

  render(){

    const storyId = this.props.match.params.id;
    console.log('comments ', this.state.comments);

    return(
      <Container>
        <Card>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom>
              {this.state.story && this.state.story.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" className="story-content" gutterBottom>
              {this.state.story && this.state.story.content}
            </Typography>
            
            {
              this.props.user.userTryToAuth && this.state.getLikes &&
              <Like 
                key={storyId} 
                storyId={storyId} 
                likes={this.state.likes}
                active={true}
              />
            }
            {
              this.props.user.userLogout && this.state.getLikes &&
              <Like 
                key={storyId} 
                storyId={storyId} 
                likes={this.state.likes}
                active={false}
              />
            }
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Box>
              {
                this.state.comments && 
                  this.state.comments.length === 0 ?
                    <Typography color="textSecondary" component="p" gutterBottom>Данную историю еще не комментировали</Typography>
                    :
                    <List className={'comments'}>
                      {
                        this.state.comments.map( (item, i) => {
                          const date = new Date(item.createdAt);
                          return(
                            <Box key={i} className={'comment'}>
                              <ListItem key={i} className={'comment-body'}>
                                <ListItemAvatar className={'comment-avatar'}>
                                  <Avatar>
                                    {item.userName[0]}
                                  </Avatar>
                                </ListItemAvatar>
                                <ListItemText 
                                  primary={
                                    <Box className={'comment-header'}>
                                      <Typography className={'comment-autor'}>
                                        {item.userName}
                                      </Typography>
                                      <Typography className={'comment-time'}>
                                        {
                                          date && 
                                          `${date.getDate()}.${date.getMonth()}.${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}`
                                        }
                                      </Typography>
                                      
                                    </Box>} 
                                  secondary={item.content} />
                              </ListItem>
                              <Divider variant="inset" component="li" />
                            </Box>
                          )
                        })
                      }
                    </List>
              }
              {
                this.props.user.userAuth ?
                  <Box>
                    <TextField
                      id="outlined-multiline-static"
                      label="Ваш комментарий"
                      fullWidth
                      multiline
                      rows="2"
                      variant="outlined"
                      className="comment-input-block"
                      value={this.state.comment}
                      onChange={e => this.changeComment(e.target.value)}
                    />
                    <Button 
                      variant="contained" 
                      color="primary"
                      onClick={() => {
                        this.createComment();
                      }}
                      >
                      Добавить комментарий
                    </Button>
                  </Box>
                :
                  <Box>
                    <Typography>Оставлять комментарии могут только авторизованные пользователи</Typography>
                  </Box>
              }
              
            </Box>
          </CardContent>
        </Card>
      </Container>
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

export default connect(mapStateToProps, mapDispatchToProps)(Article);