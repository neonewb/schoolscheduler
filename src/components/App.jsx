import React, { useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import MainPageLeft from './mainpage/MainPageLeft'
import SignUp from './mainpage/SignUp'
import LogIn from './mainpage/LogIn'
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom'
import Dashboard from './dashboard/Dashboard'
import { connect } from 'react-redux'
import { auth } from '../configs/firebase.config'
import {
  clearCurrentUserAC,
  setCurrentUserAC,
} from '../redux/auth/auth.actions'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
}))

const App = ({ currentUser, setCurrentUserAC, clearCurrentUserAC }) => {
  useEffect(() => {
    let unsubscribeFromAuth = null

    unsubscribeFromAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUserAC(user)
      } else {
        clearCurrentUserAC()
      }
    })

    return () => unsubscribeFromAuth()
  }, [currentUser, setCurrentUserAC, clearCurrentUserAC])

  const classes = useStyles()
  return (
    <Router>
      <Grid container component='main' className={classes.root}>
        {currentUser && currentUser ? (
          <Redirect to='/dashboard' />
        ) : (
          <Redirect to='/login' />
        )}

        <Route exact path='/'>
          <Redirect to='/signup' />
        </Route>

        <Route path='/signup'>
          <MainPageLeft />
          <SignUp />
        </Route>

        <Route path='/login'>
          <MainPageLeft />
          <LogIn />
        </Route>

        <Route path='/dashboard'>
          <Dashboard />
        </Route>
      </Grid>
    </Router>
  )
}

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser,
})

export default connect(mapStateToProps, {
  setCurrentUserAC,
  clearCurrentUserAC,
})(App)
