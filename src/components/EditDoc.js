import React, {useState, useEffect} from 'react';
import {useParams} from  'react-router-dom';
import TextEditor from '../components/TextEditor';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';


export default function EditDoc () {
  let { id } = useParams();
  const savePost = () => {
    console.log('save post')
  }

  useEffect(() => {
    console.log(id)
  })

  return (
    <Container>
      <Button
        variant="contained"
        color="primary"
        onClick={savePost}
      >
        Save
      </Button>

      <TextEditor/>
      
    </Container>
  )






}
