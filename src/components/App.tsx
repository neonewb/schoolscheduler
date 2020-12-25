import React, { FC, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import MainPageLeft from './mainpage/MainPageLeft'
import SignUp from './mainpage/SignUp'
import LogIn from './mainpage/LogIn'
import { Redirect, Route } from 'react-router-dom'
import Dashboard from './dashboard/Dashboard'
import { useDispatch } from 'react-redux'
import { auth } from '../configs/firebase.config'
import {
  clearCurrentUserAC,
  setCurrentUserAC,
} from '../redux/auth/auth.actions'
import { makeStyles } from '@material-ui/core'
import Edit from './edit/Edit'
import { Notifier } from './Notifier'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    '& .MuiTouchRipple-child': {
      backgroundColor: theme.palette.primary.main,
    },
  },
}))

const App: FC = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(setCurrentUserAC(user))
      } else {
        dispatch(clearCurrentUserAC())
      }
    })
    return () => unsubscribeFromAuth()
  }, [dispatch])

  const classes = useStyles()
  return (
    <Grid container component='main' className={classes.root}>
      <Route exact path='/'>
        <Redirect to='/signup' />
      </Route>

      <Route exact path='/signup'>
        <MainPageLeft />
        <SignUp />
      </Route>

      <Route exact path='/login'>
        <MainPageLeft />
        <LogIn />
      </Route>

      <Route exact path='/dashboard'>
        <Dashboard />
      </Route>

      <Route path='/edit/:id'>
        <Edit />
      </Route>
      
      <Notifier />
    </Grid>
  )
}

export default App
