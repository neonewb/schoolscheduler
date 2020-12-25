import { useEffect } from 'react'
import { auth } from '../configs/firebase.config'

export const useAuth = () => {
  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        // signIn(user)
      } else {
        // signOut()
      }
    })
    return () => unsubscribeFromAuth()
  }, [])
}
