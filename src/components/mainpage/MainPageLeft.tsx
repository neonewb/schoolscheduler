import { Grid, makeStyles, Typography } from '@material-ui/core'
import React, { FC } from 'react'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'

const useStyles = makeStyles((theme) => ({
  mainPage: {
    margin: theme.spacing(15, 3),
  },
}))

const MainPageLeft: FC = () => {
  useDocumentTitle('Neo Time Table')
  const classes = useStyles()

  return (
    <Grid item xs={false} sm={12} md={6}>
      <div className={classes.mainPage}>
        <Typography component='h1' variant='h3'>
          Neo Time Table - easy & free way to create & edit school schedules!
        </Typography>
      </div>
    </Grid>
  )
}

export default MainPageLeft
