import React from 'react';
import { Container, Typography } from '@material-ui/core';

export default function Footer(){
  return (
    <footer>
      <Container maxWidth="lg">
        <Typography variant="h6" align="center" gutterBottom>
          LOGO
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Все права защищены © Logo
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Container>
    </footer>
  );
}