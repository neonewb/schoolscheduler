import React from 'react'
import { Button, Grid, makeStyles } from '@material-ui/core'
import GoogleIcon from './GoogleIcon'

const useStyles = makeStyles((theme) => ({
  googleButton: {
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: 'white',
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
        Sign in with google
      </Button>
    </Grid>
  )
}

export default GoogleButton
