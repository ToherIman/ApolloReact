import React from 'react';
import Grid from '@material-ui/core/Grid';
import AppBar from '../components/appBar';
import UserQuery from '../components/userQuery';

function Layout() {
  return (
    <Grid container justify="center" alignItems="center">
       <Grid item component="main" xs={12} xl={6}>
          <Grid item xs={12}>
            <AppBar  />
          </Grid >
          <UserQuery >
          <Grid item xs={12}>
        
          </Grid>
          <Grid item xs={12}>
   
          </Grid>
          </UserQuery >
      </Grid>
    </Grid>
  );
}

export default Layout;