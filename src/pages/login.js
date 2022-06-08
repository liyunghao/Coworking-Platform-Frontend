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
    justifyContent: "center",
    alignItems: 'center',
  },
  form: {
    margin: 20,
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: 'center',
  }

}));
async function request(payload, urls) {
  const headers = { "Content-Type": "application/json"}
  try {
    const resp = await axios.post(urls, payload, { headers })
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
  const [nickname, setNickname] = useState();
  const [email, setEmail] = useState();
  const [register, setRegister] = useState(false);

  const classes = useStyles();
  let navigate = useNavigate();

  const submitLogin = async e => {
    e.preventDefault();
    const resp = await request ({ 
      "username": username, 
      "password": password 
    }, '/login');
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
    } else {
      // login failed
      Swal.fire("Failed", resp.message, "error");
    }
  }
  
  const submitRegister = async e => {
    e.preventDefault();
    const resp = await request({
      "username": username,
      "nickname": nickname,
      "email": email,
      "password": password,
      "admin": false
    }, '/users');
    console.log(resp)
    if (resp.status === 200) {
      Swal.fire("Success", resp.message, "success", {
        buttons: false,
        timer: 2000,
      }).then( (val) => {
        toggleMode()
      });
    } else {
      Swal.fire("Failed", resp.message, "error");
    }
  }

  const toggleMode = () => {
    setUserName('')
    setPassword('')
    setEmail('')
    setNickname('')
    setRegister(!register)
  }

  return (
    <Grid container className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} md={4} style={{display: register ? 'none' : 'flex'}} component={Paper} elevation={6} square >
        <div className={classes.paper}>
          <form className={classes.form} onSubmit={submitLogin}>
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
          <Button
          color='primary'
          onClick={toggleMode}
          >
            Register
          </Button>
        </div>
      </Grid>
      <Grid item xs={12} md={4} style={{display: register ? 'flex' : 'none'}} component={Paper} elevation={6} square >
        <div className={classes.paper}>
          <form className={classes.form} onSubmit={submitRegister}>
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
              fullWidth
              id="nickname"
              name="nickname"
              label="Nickname"
              onChange={e => setNickname(e.target.value)}
            />
            <TextField 
              variant="outlined"
              margin="normal"
              fullWidth
              id="email"
              name="email"
              label="Email"
              onChange={e => setEmail(e.target.value)}
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
              Register
            </Button>
          </form>
          <Button
          color='primary'
          onClick={toggleMode}
          >
            Login
          </Button>
        </div>
      </Grid>
    </Grid>
  )

}
