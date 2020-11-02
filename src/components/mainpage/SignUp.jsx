import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Alert from '@material-ui/lab/Alert'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { makeStyles } from '@material-ui/core'

import { Link as RLink, useHistory } from 'react-router-dom'
import { connect, useSelector } from 'react-redux'
import { logInWithGoogleAC, signUpUserAC } from '../../redux/auth/auth.actions'
import { schemaSU } from '../../utils/yupSchema'
import GoogleButton from '../google/GoogleButton'
import { useEffect } from 'react'
import { auth } from '../../configs/firebase.config'

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(8, 3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    marginTop: theme.spacing(3),
  },
}))

const SignUp = ({ signUpUserAC, logInWithGoogleAC }) => {
  const classes = useStyles()

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schemaSU),
  })

  const history = useHistory()

  useEffect(() => {
    let unsubscribeFromAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        history.push('/dashboard')
      }
    })
    return () => unsubscribeFromAuth()
  }, [history])

  const onSubmit = ({ email, password }) => {
    signUpUserAC(email, password)
  }

  return (
    <Grid item xs={12} sm={6} md={6} elevation={10} component={Paper} square>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h3'>
          Sign up
        </Typography>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className={classes.form}
          noValidate>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                inputRef={register({ required: true })}
                autoFocus
                variant='outlined'
                required
                fullWidth
                label='Email Address'
                name='email'
                type='email'
                id='email'
                autoComplete='email'
              />
              {errors.email?.message && (
                <Alert severity='error'>{errors.email?.message}</Alert>
              )}
            </Grid>

            <Grid item xs={12}>
              <TextField
                inputRef={register({ required: true })}
                variant='outlined'
                required
                fullWidth
                label='Password'
                name='password'
                type='password'
                id='password'
                autoComplete='current-password'
              />
              {errors.password?.message && (
                <Alert severity='error'>{errors.password?.message}</Alert>
              )}
            </Grid>

            <Grid item xs={12}>
              <TextField
                inputRef={register}
                variant='outlined'
                required
                fullWidth
                label='Confrim Password'
                name='confrimpassword'
                type='password'
                id='confrimpassword'
                autoComplete='current-password'
              />
              {errors.confrimpassword?.message && (
                <Alert severity='error'>
                  {errors.confrimpassword?.message}
                </Alert>
              )}
            </Grid>

            <Grid item xs={12}>
              <Button
                type='submit'
                fullWidth
                size='large'
                variant='contained'
                color='primary'>
                Sign Up
              </Button>
            </Grid>
          </Grid>
        </form>

        <Grid className={classes.form} container spacing={3}>
          <GoogleButton callBackFn={logInWithGoogleAC} />
        </Grid>

        <Grid className={classes.form} align='center' item xs={12}>
          <Link component={RLink} to='/login' variant='h6'>
            Already have an account? Log in
          </Link>
        </Grid>
      </div>
    </Grid>
  )
}

export default connect(null, { signUpUserAC, logInWithGoogleAC })(SignUp)
