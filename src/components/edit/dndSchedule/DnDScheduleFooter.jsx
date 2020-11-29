import { makeStyles } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles({
  footer: {
    display: 'flex',
    padding: 8,
  },
})

const DnDScheduleFooter = () => {
  const styles = useStyles()

  return (
    <div className={styles.footer}>
      DnD Schedule Footer
    </div>
  )
}

export default DnDScheduleFooter
