import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ArticleIcon from '@mui/icons-material/Article';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  Grid: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: "center",
    height: '40px',
    margin: '20px',
    borderRadius: '10px',
    "&:hover": {
      backgroundColor: '#D0D0D0',
      cursor: 'pointer'
    }
  }

}));
  

export default function RowComponent({id, title, author, date, tag}) {
  const classes = useStyles();
  let navigate = useNavigate(); 

  const clickRow = (id) => {
    navigate('/Bulletin/'+id);
  }

  return (
    <Box className={classes.Grid} onClick={() => {clickRow(id)}}>
      <Grid container>
        <Grid item xs={1} > <ArticleIcon /> </Grid>
        <Grid item xs={5}> {title} </Grid>
        <Grid item xs={2}> {author} </Grid>
        <Grid item xs={2}> {tag} </Grid>
        <Grid item xs={2}> {date} </Grid>
      </Grid>
    </Box>
  )


}
