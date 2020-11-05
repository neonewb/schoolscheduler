import React, { useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import MainPageLeft from './mainpage/MainPageLeft'
import SignUp from './mainpage/SignUp'
import LogIn from './mainpage/LogIn'
import { Redirect, Route } from 'react-router-dom'
import Dashboard from './dashboard/Dashboard'
import { connect } from 'react-redux'
import { auth } from '../configs/firebase.config'
import {
  clearCurrentUserAC,
  setCurrentUserAC,
} from '../redux/auth/auth.actions'
import { makeStyles } from '@material-ui/core'
import Edit from './edit/Edit'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    '& .MuiTouchRipple-child': {
      backgroundColor: theme.palette.primary.main,
    },
  },
}))

const App = ({ setCurrentUserAC, clearCurrentUserAC }) => {
    
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
  }, [setCurrentUserAC, clearCurrentUserAC])

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

      </Grid>

  )
}

// const mapStateToProps = (state) => ({
//   currentUser: state.auth.currentUser,
// })

export default connect(null, {
  setCurrentUserAC,
  clearCurrentUserAC,
})(App)
