import React, { FC } from 'react'
import DnDScheduleBody from './dndScheduleBody/DnDScheduleBody'
import DnDScheduleFooter from './dndScheduleFooter/DnDScheduleFooter'
import { Box, Typography } from '@material-ui/core'
import { ScheduleT } from '../../../redux/schedules/sched.actions'
import { useSelector } from 'react-redux'
import { AppStateType } from '../../../redux/rootReducer'
import { hasTimetableSel } from '../../../redux/schedules/sched.selectors'

type DnDScheduleProps = {
  mySchedule: ScheduleT
}

const DnDSchedule: FC<DnDScheduleProps> = ({ mySchedule }) => {
  const hasTimeTable = useSelector<AppStateType, boolean>(hasTimetableSel)

  if (hasTimeTable) {
    return (
      <div>
        <DnDScheduleBody mySchedule={mySchedule} />
        <DnDScheduleFooter />
      </div>
    )
  } else {
    return (
      <Box m={2}>
        <Typography>
          There is no timetable yet. Go to settings for create schedule
          automatically or manually.
        </Typography>
      </Box>
    )
  }
}

export default React.memo(DnDSchedule)
