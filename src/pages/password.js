import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Copyright from "../components/copyright";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.grey[900]
        : theme.palette.grey[50],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const NEW_PASSWORD = gql`
  mutation newPassword($password: String) {
    newPassword(password: $password)
  }
`;

export default function Restore() {
  const classes = useStyles();
  let history = useHistory();
  // eslint-disable-next-line

  const [values, setValues] = useState({
    password1: "",
    password2: "",
  });

  // eslint-disable-next-line
  const [submitInfo] = useMutation(NEW_PASSWORD, {
    variables: { password: values.password1 },
    onCompleted(data) {
      history.push('/login');
      sessionStorage.removeItem("token");
    }
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const token = history.location.search.substr(1);
  if (token) {
    sessionStorage.setItem("token", token);
  }

  console.log("token", token);

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Restore
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              type="password"
              margin="normal"
              required
              fullWidth
              id="password1"
              label="New password"
              autoFocus
              value={values.password1}
              onChange={handleChange("password1")}
            />
            <TextField
              variant="outlined"
              margin="normal"
              type="password"
              required
              fullWidth
              id="password2"
              label="Repeat password"
              name="password"
              autoComplete="password"
              autoFocus
              value={values.password2}
              onChange={handleChange("password2")}
            />
            {values.password1 === values.password2 ? (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={(e) => {
                  e.preventDefault();
                  submitInfo();
                }}
              >
                SEND
              </Button>
            ) : (
              <Button
                color="inactive"
                fullWidth
                variant="contained"
                className={classes.submit}
              >
                PASSWORDS DON'T MATCH
              </Button>
            )}
            <Grid container>
              <Grid item>
                <Link href="/signUp" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
