import React from 'react'
import { Button, Grid, makeStyles, Typography } from '@material-ui/core'
import GoogleIcon from './GoogleIcon'
import { teal } from '@material-ui/core/colors'

const useStyles = makeStyles((theme) => ({
  googleButton: {
    backgroundColor: teal[50],
    '&:hover': {
      backgroundColor: teal[100],
    },    
    height: 66.69,
    fontSize: 25,
    fontFamily: 'Comfortaa',
  },
}))

const GoogleButton = ({ callBackFn }) => {
  const classes = useStyles()
  return (
    <Grid align='center' item xs={12}>
      <Button
        className={classes.googleButton}
        onClick={() => callBackFn()}
        startIcon={<GoogleIcon />}
        fullWidth
        size='large'
        variant='contained'>
        <Typography variant='h5'>
          Sign in with google
        </Typography>
      </Button>
    </Grid>
  )
}

export default GoogleButton
