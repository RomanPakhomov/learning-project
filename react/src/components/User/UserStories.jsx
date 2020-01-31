import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import storyActions from '../../actions/story';
import userActions from '../../actions/user';
import { Box, ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails, FormControlLabel, Switch, Button, Paper } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

class UserStories extends React.Component{
  constructor(props){
    super(props)
  }

  componentDidMount(){
    this.props.storyActions.getCategories();
    this.props.storyActions.getUserStories();
  }

  getStoryCategory(id){
    let category = this.props.story.categories.find(item => item.id == id);
    if(category){
      return category.name;
    }
  }

  render(){

    const {path} = this.props.match;

    return(
      <Box>
        <Typography type="h2" variant="h5" gutterBottom>Мои истории</Typography>
        {
          this.props.story.stories.length !== 0 ? 
            this.props.story.stories.map( (item, index) => {
              return(
                <ExpansionPanel key={item.storyId}>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon></ExpandMoreIcon>}
                    aria-controls={item.id}
                    id={item.id}
                    aria-label="Expand"
                  >
                    <Box>
                      <Typography>{item.title} </Typography>
                    </Box> 
                    <Box>
                      <Typography>{this.getStoryCategory(item.category)}</Typography>
                    </Box> 
                    <Box>
                      <FormControlLabel 
                        onClick={event => event.stopPropagation()}
                        onFocus={event => event.stopPropagation()}
                        control={
                          <Switch 
                            checked={item.public}
                            color="primary"
                            onChange={() => this.props.storyActions.changeStoryStatus(item.storyId, item.public)}
                          />
                        }
                        label="Опубликована" />
                    </Box>  
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails className="expansion-panel">
                    <Box className={'user-story-body'}>
                      <Typography className={'user-story-content'}>{item.content}</Typography>
                    </Box>
                    <Box>
                      <Link to={`${path}/change-story/${index}`}>
                        <Button
                          className="expansion-button"
                          variant="contained"
                          startIcon={<EditIcon/>}
                          >
                          Редактировать
                        </Button>
                      </Link>
                      <Button 
                        onClick={() => this.props.storyActions.modalDeleteOpen(item.storyId)}
                        className="expansion-button"
                        variant="contained" 
                        color="secondary"
                        startIcon={<DeleteIcon />}>
                        Удалить
                      </Button>
                    </Box>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              )
            })
          :
          <Paper className={'info-card'}>
            <Typography>
              На данный момент статьи еще не добавлены
            </Typography>
          </Paper>
        }
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
    storyActions: bindActionCreators(storyActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserStories);