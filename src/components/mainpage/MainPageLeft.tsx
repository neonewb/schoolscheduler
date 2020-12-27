import { Grid, makeStyles, Typography } from '@material-ui/core'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import { Footer } from '../Footer'
import { SwitchLanguage } from '../SwitchLanguage'

const useStyles = makeStyles((theme) => ({
  mainPage: {
    margin: theme.spacing(3, 3),
  },
}))

const MainPageLeft: FC = () => {
  useDocumentTitle('Neo Time Table')
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <Grid item xs={false} sm={12} md={6}>
      <div className={classes.mainPage}>
        <Typography component='h1' variant='h3'>
          {t('MainPageLeft')}
        </Typography>
      </div>
      <SwitchLanguage/>
      <Footer textAlign />
    </Grid>
  )
}

export default MainPageLeft
