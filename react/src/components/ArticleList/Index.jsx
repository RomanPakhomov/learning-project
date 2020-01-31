import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import userActions from '../../actions/user';
import generalActions from '../../actions/general';
import storyActions from '../../actions/story'
import { Link } from 'react-router-dom';
import { Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button, Container, Grid, List, ListItem, ListItemText, Divider, Paper } from '@material-ui/core';
import Like from '../Shared/Like';
import SideBar from '../Shared/SideBar';

import image from '../../img/image.jpg';

class ArticleList extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.generalActions.fetchArticles()
    this.props.storyActions.getCategories();
  }

  render(){

    const categoryId = this.props.match.params.id

    return(
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <SideBar />
          </Grid>
          <Grid item xs={8}>
            {
              this.props.general.isLoading === true ?
                <span>Loading...</span>
              :
                this.props.general.stories.length !== 0 ?
                  this.props.general.stories.map((article, i)=>{
                    return(
                      <Card key={article.storyId}>
                        <CardActionArea>
                          <Link to={`/story/${article.storyId}`}>
                            <CardMedia
                              image={`/${image}`}
                            >
                            </CardMedia>
                            <CardContent>
                              <Typography variant="h5" component="h2" gutterBottom>
                                {article.title}
                              </Typography>
                              <Typography variant="body2" color="textSecondary" component="p">
                                {article.body}
                              </Typography>
                            </CardContent>
                          </Link>
                        </CardActionArea>
                        <CardActions>
                          {
                            this.props.user.userTryToAuth &&
                            <Like 
                              key={article.storyId} 
                              storyId={article.storyId} 
                              likes={article.likes}
                              active={true}
                            />
                          }
                          {
                            this.props.user.userLogout &&
                            <Like 
                              key={article.storyId} 
                              storyId={article.storyId} 
                              likes={article.likes}
                              active={false}
                            />
                          }
                          
                          <Link to={`/story/${article.storyId}`}>
                            <Button 
                              size="small" 
                              color="primary"
                            >
                              Читать подробнее
                            </Button>
                          </Link>
                        </CardActions>
                      </Card>
                    )
                  })
                :
                  <Paper className={'info-card'}>
                    <Typography>
                      На данный момент статьи еще не добавлены
                    </Typography>
                  </Paper>
            }
          </Grid>
        </Grid>
        
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
    generalActions: bindActionCreators(generalActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch),
    storyActions: bindActionCreators(storyActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);