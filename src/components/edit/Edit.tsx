import { Divider } from '@material-ui/core'
import React, { FC, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { auth } from '../../configs/firebase.config'
import { useStylesEdit } from '../../styles/stylesForEdit'
import { getDocFromDBAC, ScheduleT } from '../../redux/schedules/sched.actions'
import EditNavBar from './EditNavBar'
import EditToolBar from './EditToolBar'
import SettingsSchedule from './settingsSchedule/SettingsSchedule'
import DnDSchedule from './dndSchedule/DnDSchedule'
import { getUserS } from '../../redux/auth/auth.selectors'
import { CurrentUserT } from '../../redux/auth/auth.actions'
import {
  getIsLoadingS,
  getSchedulesS,
} from '../../redux/schedules/sched.selectors'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { AppStateType } from '../../redux/rootReducer'
import { Skeleton } from '@material-ui/lab'
import { getIsLoadingTT } from '../../redux/timetable/tt.selectors'

const Edit: FC = () => {
  const classes = useStylesEdit()

  const [isSettingsOpen, setSettingsOpen] = useState<boolean>(false)

  const user = useSelector<AppStateType, CurrentUserT>(getUserS)
  const isLoadingS = useSelector<AppStateType, boolean>(getIsLoadingS)
  const isLoadingTT = useSelector<AppStateType, boolean>(getIsLoadingTT)
  const schedules = useSelector<AppStateType, Array<ScheduleT>>(getSchedulesS)

  const { id } = useParams<{ id: string }>()

  const history = useHistory()
  const dispatch = useDispatch()

  let mySchedule = schedules.find((i) => i.id === id)

  useEffect(() => {
    let unsubscribeFromAuth = auth.onAuthStateChanged((userAuth) => {
      if (!userAuth) {
        history.push('/login')
      } else if (userAuth && schedules.length === 0) {
        dispatch(getDocFromDBAC(userAuth.email!, id))
      }
    })
    return () => unsubscribeFromAuth()
  }, [history, schedules, dispatch, id])

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={classes.root}>
        <EditNavBar
          isLoading={isLoadingS}
          mySchedule={mySchedule}
          user={user}
          schedLength={schedules.length}
        />

        <Divider />

        <EditToolBar
          setSettingsOpen={setSettingsOpen}
          mySchedule={mySchedule}
        />

        <Divider />

        {isSettingsOpen && mySchedule && (
          <SettingsSchedule
            isOpen={isSettingsOpen}
            mySchedule={mySchedule}
            setSettingsOpen={setSettingsOpen}
          />
        )}

        {mySchedule && !isLoadingS && !isLoadingTT && !isSettingsOpen && (
          <DnDSchedule mySchedule={mySchedule} />
        )}

        {(isLoadingS || isLoadingTT) && (
          <Skeleton variant='rect' style={{ width: '100%', height: '100%' }} />
        )}
      </div>
    </DndProvider>
  )
}

export default Edit
