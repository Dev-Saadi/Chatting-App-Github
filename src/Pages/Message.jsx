import React from 'react'
import Grid from '@mui/material/Grid';
import Friends from "../Componenets/Friends"
import MyGroup from "../Componenets/MyGroup"
import Msg from '../Componenets/Msg';

const Message = () => {
  return (

    <>

      <Grid container spacing={2}>
        <Grid item xs={3}>
          <MyGroup />
          <Friends />
        </Grid>
        <Grid item xs={9}>
          <Msg />
        </Grid>

      </Grid>

    </>

  )
}

export default Message