import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  CircularProgress: {
    margin: 20,
  }
}))

const Loader = () => {
  const classes = useStyles()
  return <CircularProgress className={classes.CircularProgress} />
}

export default Loader
