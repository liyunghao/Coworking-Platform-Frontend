import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import CssBaseline from '@mui/material/CssBaseline';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import Swal from 'sweetalert2';

const useStyles = makeStyles((theme) => ({
  root: {
    direction: "column",
    alignItems: 'center',
    justifyContent: "center",
    height: '100vh',
  },
  paper: {
    margin: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }

}));
async function loginUser(payload) {
  const headers = { "Content-Type": "application/json"}
  try {
    const resp = await axios.post('/login', payload, { headers })
                            .then()
                            .catch(err => {
                               console.log('Error', err);
                            });
    return resp
  } catch (err) {
    console.log(err);
  }
}


export default function Login() {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const classes = useStyles();
  let navigate = useNavigate();

  const submitForm = async e => {
    e.preventDefault();
    const resp = await loginUser ({ 
      "username": username, 
      "password": password 
    });
    console.log(resp)
    if ('token' in resp.data) {
      // login success
      Swal.fire("Success", resp.message, "success", {
        buttons: false,
        timer: 2000,
      }).then( (val) => {
        localStorage.setItem('token', resp.data.token)
        navigate("/");
      });
      console.log("login success")
    } else {
      // login failed
      Swal.fire("Failed", resp.message, "error");
      console.log("login failed")
    }
  }
  return (
    <Grid container className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} md={5} component={Paper} elevation={6} square >
        <div className={classes.paper}>
          <form onSubmit={submitForm}>
            <TextField 
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              name="username"
              label="Username"
              onChange={e => setUserName(e.target.value)}
            />
            <TextField 
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              onChange={e => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Sign In
            </Button>
          </form>
        </div>
      </Grid>

    </Grid>
  )

}
