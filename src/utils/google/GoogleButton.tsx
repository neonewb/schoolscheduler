import React, { FC } from 'react'
import { Button, Grid, makeStyles, Typography } from '@material-ui/core'
import GoogleIcon from './GoogleIcon'
import { teal } from '@material-ui/core/colors'
import { logInWithGoogleAC } from '../../redux/auth/auth.actions'
import { useDispatch } from 'react-redux'

const useStyles = makeStyles(() => ({
  googleButton: {
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: teal[200],
    },
    height: 66.69,
    fontSize: 25,
    fontFamily: 'Comfortaa',
  },
}))

const GoogleButton: FC = () => {
  const classes = useStyles()

  const dispatch = useDispatch()

  const handleGoogleLogIn = () => {
    dispatch(logInWithGoogleAC())
  }

  return (
    <Grid item xs={12}>
      <Button
        className={classes.googleButton}
        onClick={handleGoogleLogIn}
        startIcon={<GoogleIcon />}
        fullWidth
        size='large'
        variant='contained'>
        <Typography variant='h5'>Sign in with google</Typography>
      </Button>
    </Grid>
  )
}

export default GoogleButton
