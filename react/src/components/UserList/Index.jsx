import React from 'react';
import axios from 'axios';
import { Container, Grid, Card, Avatar, CardHeader, Typography, Box } from '@material-ui/core';
import SideBar from '../Shared/SideBar';

export default class UserList extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isLoading: false,
      users: []
    }
    this.fetchUsers = this.fetchUsers.bind(this);
  }

  async fetchUsers(){
    this.setState({
      isLoading: true
    });
    const token = sessionStorage.getItem('token')
    try{
      const result = await axios.get('http://localhost:5000/users',
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('users ', result.data)
      this.setState({
        //users: result.data,
        isLoading: false,
        users: result.data
      })
    } catch(e) {
      console.log(e);
    } finally {
      this.setState({
        isLoading: false
      })
    }
  }

  componentDidMount(){
    this.fetchUsers();
  }

  render(){
    return (
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <SideBar />
          </Grid>
          <Grid item xs={8}>
            {
              this.state.users &&
                this.state.users.map( user => {
                  let date = new Date(user.birthDate);
                  return(
                    <Card key={user.userId}>
                      <CardHeader
                        avatar={
                          <Avatar>
                            {user.name[0]}
                          </Avatar>
                        }
                        title={`${user.name} ${user.surname}`}
                        subheader={
                          <Box>
                            <Typography>e-mail: <span>{user.login}</span></Typography>
                            {
                              user.birthDate && 
                              <Typography>дата рождения: 
                                <span>
                                  {` ${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`}
                                </span>
                              </Typography>
                            }
                          </Box>
                        }
                      ></CardHeader>
                    </Card>
                  )
                })
            }
          </Grid>
        </Grid>
      </Container>
    )
  }
}