import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom'
import RowComponent from '../components/RowComponent'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import AddBoxIcon from '@mui/icons-material/AddBox';
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { makeStyles } from '@mui/styles';
import Tooltip from '@mui/material/Tooltip';

const Posts = [
  {
    id: 1,
    title: "First Article",
    author: "Tony",
    tag: "Woodpecker",
    date: "2022/06/05"
  },
  {
    id: 2,
    title: "Second Article",
    author: "Elven",
    tag: "DSNS",
    date: "2022/06/05"
  },
  {
    id: 3,
    title: "Third Article",
    author: "CPC",
    tag: "Unix",
    date: "2022/06/06"
  }
]
const useStyles = makeStyles((theme) => ({
  Paper: {
  },
  Box: {
    display: 'flex',
    flexGrow:1,
    margin: '10px',
    height: '40px',
    alignItems: 'center',
    justifyContent: "center",
    color: '#6C6C6C'
  },
  Grid: {
    paddingTop: '20px',
    alignItems: 'center',
    justifyContent: "center",
  }

}));

export default function Bulletin (){
  let navigate = useNavigate()
  const classes = useStyles()
  const AddPost = () => {
      navigate("/addDoc")
  }
  return (
    <Box>
      <Container className="flex">
        <Paper sx={{height: '80vh'}} className={classes.Paper}>
           <Box className={classes.Box}>
            <Grid container className={classes.Grid}>
              <Grid item xs={1}>
                <Tooltip title="Add New Post">
                  <IconButton onClick={AddPost}>
                    <AddBoxIcon sx={{fontSize: '40px'}} />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item xs={5}> Title </Grid>
              <Grid item xs={2}> Author </Grid>
              <Grid item xs={2}> Tag </Grid>
              <Grid item xs={2} > Date </Grid>
            </Grid>
          </Box>
          {Posts.map((item) => (
            <RowComponent key={item.id} id={item.id} title={item.title} author={item.author} tag={item.tag} date={item.date} />
          ))}
        </Paper>
      </Container>
    </Box>

  )
}
