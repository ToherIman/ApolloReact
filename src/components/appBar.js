import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  const handleLogout = () => {
    sessionStorage.removeItem('token')
  }

  return (
      <AppBar position="static" style={{ borderBottomLeftRadius: 4, borderBottomRightRadius: 4 }} elevation={3}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
          <Link href="/" color="inherit">
            <b>HOME</b>
          </Link>
          </Typography>
          <Typography variant="h6" >
            <Link href="/login" color="inherit" onClick={handleLogout}>
              <b>LOGOUT</b> 
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>

  );
}
