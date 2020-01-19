import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import storyActions from '../../actions/story';
import { Box, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Button, FormControlLabel, Checkbox, FormHelperText } from '@material-ui/core';

class UserCreateStory extends React.Component{
  constructor(props){
    super(props);

    this.ref = React.createRef();
    this.labelWidth = 0;
  }

  componentDidMount(){
    this.props.actions.getCategories();
    this.labelWidth = this.ref.current.offsetWidth;
    console.log('this.props.story.createResult ', this.props.story.createResult)
  }

  render(){
    return(
      <Box className="add-story">
        {
        this.props.story.createResult && 
          <Redirect 
            to={{
              pathname: "/user",
            }}
          />
        }
        <Typography variant="h5" component="h2" gutterBottom>
          Новая история
        </Typography>
        <TextField
          fullWidth
          id="story-title"
          label="Название истории"
          variant="outlined"
          className="story-input-block"
          error={this.props.story['_titleError']}
          value={this.props.story.title && this.props.story.title}
          helperText={this.props.story['_titleError'] && 'Укажите заголовок'}
          onBlur={e => this.props.actions.validate(e.target.value, '_titleError')}
          onChange={e => this.props.actions.saveStoryTitleValue(e.target.value)}
        />
        <Box className="story-input-block">
          <FormControl variant="outlined" fullWidth
           error={this.props.story['_categoryError']}
           onBlur={e => this.props.actions.validate(e.target.value, '_categoryError')}
          >
            <InputLabel ref={this.ref} id="story-category-label">
              Категория *
            </InputLabel>
            <Select
              labelId="story-category-label"
              id="story-category"
              onChange={e => this.props.actions.saveStoryCategoryValue(e.target.value)}
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
            {this.props.story['_categoryError'] && <FormHelperText>Укажите категорию</FormHelperText>}
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
          value={this.props.story.content && this.props.story.content}
          error={this.props.story['_storyError']}
          helperText={this.props.story['_storyError'] && 'Укажите текст истории'}
          onBlur={e => this.props.actions.validate(e.target.value, '_storyError')}
          onChange={e => this.props.actions.saveStoryContentValue(e.target.value)}
        />
        <Box className="story-input-block">
          <FormControlLabel 
          control={
            <Checkbox 
              value="public" 
              onChange={this.props.actions.saveStoryPublic}
            />
          } 
          label="Опубликована" />
        </Box>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => {
            this.props.actions.createStory()
            this.props.actions.validateFinal(['_titleError', '_storyError', '_categoryError'])}}>
          Добавить историю
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