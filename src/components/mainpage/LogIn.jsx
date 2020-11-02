import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import { Checkbox, FormControlLabel, makeStyles } from '@material-ui/core'
import { Link as RLink, useHistory } from 'react-router-dom'

import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Alert from '@material-ui/lab/Alert'

import { connect } from 'react-redux'
import { logInUserAC, logInWithGoogleAC } from '../../redux/auth/auth.actions'
import { schemaSI } from '../../utils/yupSchema'
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

const LogIn = ({ logInUserAC, logInWithGoogleAC }) => {
  const classes = useStyles()

  const { register, handleSubmit, control, errors } = useForm({
    resolver: yupResolver(schemaSI),
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
    logInUserAC(email, password)
  }

  return (
    <Grid item xs={12} sm={6} md={6} elevation={10} component={Paper} square>
      <div className={classes.paper}>
        <Avatar>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h3'>
          Log In
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
              <FormControlLabel
                control={
                  <Controller
                    name='remember'
                    control={control}
                    defaultValue={false}
                    render={(props) => (
                      <Checkbox
                        color='primary'
                        onChange={(e) => props.onChange(e.target.checked)}
                        checked={props.value}
                      />
                    )}
                  />
                }
                label='Remember me'
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type='submit'
                size='large'
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}>
                Log In
              </Button>
            </Grid>
          </Grid>
        </form>

        <Grid className={classes.form} container spacing={3}>
          <GoogleButton callBackFn={logInWithGoogleAC} />

          <Grid item xs={12}>
            <Grid container justify='flex-end'>
              <Grid item xs>
                <Link component={RLink} to='/signup' variant='h6'>
                  Forgot password?
                </Link>
              </Grid>

              <Grid item>
                <Link component={RLink} to='/signup' variant='h6'>
                  Sign Up
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Grid>
  )
}

export default connect(null, { logInUserAC, logInWithGoogleAC })(LogIn)
