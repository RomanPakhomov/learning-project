import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import storyActions from '../../actions/story';
import { Box, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Button, FormControlLabel, Checkbox } from '@material-ui/core';

class UserCreateStory extends React.Component{
  constructor(props){
    super(props);

    this.ref = React.createRef();
    this.labelWidth = 0;

    this.props.actions.prepareChangeStory(this.props.match.params.id);
  }

  componentDidMount(){
    this.props.actions.getCategories();  
    this.labelWidth = this.ref.current.offsetWidth;
  }

  render(){
    const id = this.props.match.params.id;

    return(
      <Box className="add-story">
        {
        this.props.story.updateResult && 
          <Redirect 
            to={{
              pathname: "/user",
            }}
          />
        }
        <Typography variant="h5" component="h2" gutterBottom>
          Изменене истории
        </Typography>
        <TextField
          required
          fullWidth
          id="story-title"
          label="Название истории"
          variant="outlined"
          className="story-input-block"
          error={this.props.story['_titleCorError']}
          helperText={this.props.story['_titleCorError'] && 'Укажите заголовок'}
          onBlur={e => this.props.actions.validate(e.target.value, '_titleCorError')}
          onChange={e => this.props.actions.changeStoryTitleValue(e.target.value)}
          value={this.props.story.title && this.props.story.title}
        />
        <Box className="story-input-block">
          <FormControl variant="outlined" fullWidth>
            <InputLabel ref={this.ref} id="story-category-label">
              Категория *
            </InputLabel>
            <Select
              labelId="story-category-label"
              id="story-category"
              onChange={e => this.props.actions.changeStoryCategoryValue(e.target.value)}
              value={this.props.story.category}
              labelWidth={this.labelWidth}
            >
              {
                this.props.story.categories.map(item => {
                  return(
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}                
                    </MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Box>
        <TextField
          id="outlined-multiline-static"
          label="История"
          fullWidth
          multiline
          rows="10"
          variant="outlined"
          className="story-input-block"
          error={this.props.story['_storyCorError']}
          helperText={this.props.story['_storyCorError'] && 'Укажите текст истории'}
          onBlur={e => this.props.actions.validate(e.target.value, '_storyCorError')}
          onChange={e => this.props.actions.changeStoryContentValue(e.target.value)}
          value={this.props.story.content && this.props.story.content}
        />
        <Box className="story-input-block">
          <FormControlLabel 
          control={
            <Checkbox 
              value="public" 
              checked={this.props.story.public !== undefined ? this.props.story.public : this.props.story.stories[id].public}
              onChange={this.props.actions.changeStoryPublic}
            />
          } 
          label="Опубликована" />
        </Box>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => {
            this.props.actions.changeStory();
            this.props.actions.validateFinal(['_titleCorError', '_storyCorError'])}}>
          Сохранить изменения
        </Button>
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
    actions: bindActionCreators(storyActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserCreateStory);