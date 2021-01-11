import { Box, Grid, makeStyles, Typography } from '@material-ui/core'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import DayScheduleTable from '../edit/dndSchedule/dndScheduleBody/DayScheduleTable'
import { Footer } from '../Footer'
import { SwitchLanguage } from '../SwitchLanguage'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import DnDScheduleHead from '../edit/dndSchedule/dndScheduleBody/DnDScheduleHead'

const useStyles = makeStyles((theme) => ({
  mainPage: {
    margin: theme.spacing(3, 3),
  },
  table: {
    margin: 'auto',

  },
}))

const MainPageLeft: FC = () => {
  useDocumentTitle('Neo Time Table')
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <DndProvider backend={HTML5Backend}>
      <Grid item xs={false} sm={12} md={6}>
        <div className={classes.mainPage}>
          <Typography component='h1' variant='h3'>
            {t('MainPageLeft')}
          </Typography>
          <Box className={classes.table}>
            <DnDScheduleHead maxLessonsPerDay={6} numberOfDays={1} />
            <DayScheduleTable
              dayNum={0}
              maxLessonsPerDay={6}
              classes={[
                '1 A',
                '1 B',
                '2 A',
                '2 B',
                '3 A',
                '4 B',
                '7 A',
                '8 B',
                '10 A',
                '11 B',
              ]}
              demo
            />
          </Box>
          <SwitchLanguage />
          <Footer textAlign />
        </div>
      </Grid>
    </DndProvider>
  )
}

export default MainPageLeft
