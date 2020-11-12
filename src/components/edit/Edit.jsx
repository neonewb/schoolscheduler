import { Divider } from '@material-ui/core'
import React, { useEffect, useState, Suspense } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { auth } from '../../configs/firebase.config'
import { useStylesEdit } from '../../styles/stylesForEdit'
import {
  chooseSingleAC,
  getDocFromDBAC,
} from '../../redux/database/firestore.actions'
import EditNavBar from './EditNavBar'
import EditToolBar from './EditToolBar'
const SettingsSchedule = React.lazy(() => import('./SettingsSchedule'))

const Edit = () => {
  const classes = useStylesEdit()

  const [isSetSchedOpen, setIsSetSchedOpen] = useState(false)

  const user = useSelector((state) => state.auth.currentUser)

  const isLoading = useSelector((state) => state.fsdb.isLoading)

  const schedules = useSelector((state) => state.fsdb.schedules)

  const { id } = useParams()

  const history = useHistory()
  const dispatch = useDispatch()

  let mySchedule = schedules.find((i) => i.id)

  if (mySchedule === undefined) {
    mySchedule = schedules[0]
  }

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

  useEffect(() => {
    if (mySchedule !== undefined && !isLoading) {
      dispatch(chooseSingleAC(mySchedule.id))
    }
  }, [isLoading])

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
        setIsSetSchedOpen={setIsSetSchedOpen}
        isOpen={isSetSchedOpen}
      />

      <Divider />

      <Suspense fallback={<></>}>
        <SettingsSchedule isOpen={isSetSchedOpen} mySchedule={mySchedule} />
      </Suspense>
    </div>
  )
}

export default Edit
