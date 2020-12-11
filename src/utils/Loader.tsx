import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import React from 'react'

const useStyles = makeStyles(() => ({
  CircularProgress: {
    margin: 20,
  },
}))

export const Loader: React.FC = () => {
  const classes = useStyles()
  return <CircularProgress className={classes.CircularProgress} />
}
