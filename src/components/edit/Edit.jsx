import { Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { auth } from '../../configs/firebase.config'

const Edit = () => {

  const history = useHistory()

  useEffect(() => {
    let unsubscribeFromAuth = auth.onAuthStateChanged((user) => {
      if (!user) {
        history.push('/login')
      }
    })
    return () => unsubscribeFromAuth()
  }, [history])
  
  return (
    <Typography>Editor</Typography>
  )
}

export default Edit
