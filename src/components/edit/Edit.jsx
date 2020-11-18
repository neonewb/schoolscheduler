import { Divider } from '@material-ui/core'
import React, { useEffect, useState, Suspense } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { auth } from '../../configs/firebase.config'
import { useStylesEdit } from '../../styles/stylesForEdit'
import {
  getDocFromDBAC,
} from '../../redux/database/firestore.actions'
import EditNavBar from './EditNavBar'
import EditToolBar from './EditToolBar'
const SettingsSchedule = React.lazy(() =>
  import('./settingsSchedule/SettingsSchedule')
)

const Edit = () => {
  const classes = useStylesEdit()

  const [isSetSchedOpen, setSchedOpen] = useState(false)

  const user = useSelector((state) => state.auth.currentUser)

  const isLoading = useSelector((state) => state.fsdb.isLoading)

  const schedules = useSelector((state) => state.fsdb.schedules)

  const { id } = useParams()

  const history = useHistory()
  const dispatch = useDispatch()

  let mySchedule = schedules.find((i) => i.id === id)

  useEffect(() => {
    let unsubscribeFromAuth = auth.onAuthStateChanged((userAuth) => {
      if (!userAuth) {
        history.push('/login')
      } else if (userAuth && schedules.length === 0) {
        dispatch(getDocFromDBAC(userAuth.email, userAuth.uid, id))
      }
    })
    return () => unsubscribeFromAuth()
  }, [history, schedules, dispatch, id])

  return (
    <div className={classes.root}>
      <EditNavBar
        isLoading={isLoading}
        mySchedule={mySchedule}
        user={user}
        schedLength={schedules.length}
        schedID={id}
      />

      <Divider />

      <EditToolBar
        setSchedOpen={setSchedOpen}
        isOpen={isSetSchedOpen}
        isLoading={isLoading}
        mySchedule={mySchedule}
      />

      <Divider />

      <Suspense fallback={<></>}>
        <SettingsSchedule isOpen={isSetSchedOpen} mySchedule={mySchedule} />
      </Suspense>
    </div>
  )
}

export default Edit
