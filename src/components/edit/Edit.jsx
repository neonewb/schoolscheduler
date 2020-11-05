import { Divider, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { auth } from '../../configs/firebase.config'
import { useStylesEdit } from '../../styles/stylesForEdit'
import { getDocFromDBAC } from '../../redux/database/firestore.actions'
import EditNavBar from './EditNavBar'

const Edit = () => {
  const classes = useStylesEdit()

  const user = useSelector((state) => state.auth.currentUser)

  const isLoading = useSelector((state) => state.fsdb.isLoading)

  const schedules = useSelector((state) => state.fsdb.schedules)

  const { id } = useParams()

  const history = useHistory()
  const dispatch = useDispatch()

  let mySchedule = schedules.filter((i) => i.id === id)[0]
  console.log(mySchedule)
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

  if (isLoading || mySchedule === undefined) {
    return <Typography>Loading...</Typography>
  }
  return (
    <div className={classes.root}>
      <EditNavBar scheduleTitle={mySchedule.title} user={user} schedLength={schedules.length}/>
      <Divider />
    </div>
  )
}

export default Edit
