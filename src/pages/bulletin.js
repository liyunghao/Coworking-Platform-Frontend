import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom'
import { EditorState, convertToRaw } from 'draft-js';
import RowComponent from '../components/RowComponent'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import AddBoxIcon from '@mui/icons-material/AddBox';
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Modal from '@mui/material/Modal';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import Swal from 'sweetalert2';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  alignItems: 'center',
  justifyContent: "center",
  p: 4,
};
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

export default function Bulletin () {
  const [posts, setPosts] = useState()
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [tag, setTag] = useState('')
  let navigate = useNavigate()
  const classes = useStyles()
  
  const tokenExpired = err => {
    if (err.response.status === 401) {
      localStorage.removeItem('token')
      Swal.fire("Token Expired!", "Please Login Again", "error")
        .then(result => {
          if (result.isConfirmed) {
            navigate("/login")
          }
        })
    }
  }
  const AddPost = async () => {
      console.log("Add post: ", title)
      let token = localStorage.getItem('token')
      const headers = { "Content-Type": "application/json", "x-access-tokens": token }
      try {
        const resp = await axios.post('/bulletin', 
            {
              "title": title,
              'content': JSON.stringify(convertToRaw(EditorState.createEmpty().getCurrentContent())),
              'tag': tag
            }, {headers})
          .then(response => {
            let postId = response.data.postId
            navigate('edit/'+postId)
          })
          .catch(tokenExpired)
        console.log(resp)
      }  catch (err) {
        console.log(err)
      }
      
  }
  useEffect(() => {
    const fetchPosts = async () => {
      let token = localStorage.getItem('token')
      const headers = { "Content-Type": "application/json", "x-access-tokens": token }
      try {
        const resp = await axios.get('/bulletin', { headers })
          .then()
          .catch(err => { 
            if (err.response.status === 401) {
              localStorage.removeItem('token')
              Swal.fire("Token Expired!", "Please Login Again", "error")
                .then(result => {
                  if (result.isConfirmed) {
                    navigate("/login")
                  }
                })
            }
          })
        setPosts(resp.data.payload)
      } catch(err) {
        console.log(err)
      }
    }
    fetchPosts()
  }, [])
  return (
    <Box>
      <Modal
        open={open}
        onClose={() => {setOpen(false)}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <TextField 
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="Title"
            name="Title"
            label="Title"
            onChange={e => setTitle(e.target.value)}
          />
          <TextField 
            variant="outlined"
            margin="normal"
            fullWidth
            id="Tag"
            name="Tag"
            label="Tag"
            onChange={e => setTag(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={AddPost}
          >
            Add
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {setTitle(''); setOpen(false)}}
          >
            Cancel
          </Button>
        </Box>
      </Modal>
      <Container className="flex">
        <Paper sx={{height: '80vh'}} className={classes.Paper}>
           <Box className={classes.Box}>
            <Grid container className={classes.Grid}>
              <Grid item xs={1}>
                <Tooltip title="Add New Post">
                  <IconButton onClick={() => {setOpen(true)}}>
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
          {posts && posts.map((item) => (
            <RowComponent key={item.postId} id={item.postId} title={item.title} author={item.author} tag={item.tag} date={item.date} />
          ))}
        </Paper>
      </Container>
    </Box>

  )
}
