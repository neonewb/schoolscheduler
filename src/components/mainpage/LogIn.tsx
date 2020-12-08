import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import { Checkbox, FormControlLabel } from '@material-ui/core'
import { Link as RLink, useHistory } from 'react-router-dom'

import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Alert from '@material-ui/lab/Alert'

import { useDispatch } from 'react-redux'
import { logInUserAC } from '../../redux/auth/auth.actions'
import { schemaSI } from '../../utils/yupSchema'
import GoogleButton from '../../utils/google/GoogleButton'
import { FC, useEffect } from 'react'
import { auth } from '../../configs/firebase.config'
import { useStylesLoginSignUp } from '../../styles/styleLoginSignUp'

const LogIn: FC = () => {
  const classes = useStylesLoginSignUp()

  const dispatch = useDispatch()

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

  type SubmitT = {
    email: string
    password: string
  }

  const onSubmit = ({ email, password }: SubmitT) => {
    dispatch(logInUserAC(email, password))
  }

  return (
    <Grid item xs={12} sm={12} md={6} elevation={10} component={Paper} square>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h3'>
          Log In
        </Typography>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className={classes.form}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                InputProps={{
                  classes: {
                    input: classes.fontSizeTextField,
                  },
                }}
                inputRef={register({ required: true })}
                autoFocus
                variant='filled'
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
                InputProps={{
                  classes: {
                    input: classes.fontSizeTextField,
                  },
                }}
                inputRef={register({ required: true })}
                variant='filled'
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
                // color='primary'
                className={classes.button}>
                <Typography variant='h5'>Log In</Typography>
              </Button>
            </Grid>
          </Grid>
        </form>

        <Grid className={classes.form} container spacing={3}>
          <GoogleButton />

          <Grid item xs={12}>
            <Grid container>
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

export default LogIn
