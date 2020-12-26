import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@material-ui/core'
import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resolveConflict } from '../../../../redux/timetable/tt.actions'
import { getConflict } from '../../../../redux/timetable/tt.selectors'
import { daysOfTheWeek } from '../../../../utils/daysOfTheWeek'

export const ReplaceConfirm: FC = () => {
  const dispatch = useDispatch()
  const {
    conflictClassLesson,
    conflictTeacherLesson,
    isOpenModal,
    lesson,
    dropResult,
  } = useSelector(getConflict)

  const replaceConfirm = () => {
    dispatch(resolveConflict(true))
  }

  const handleClose = () => {
    dispatch(resolveConflict(false))
  }

  return (
    <Dialog
      transitionDuration={100}
      open={isOpenModal}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'>
      <DialogTitle id='alert-dialog-title'>Conflict detected:</DialogTitle>
      <DialogContent dividers>
        {conflictClassLesson && (
          <Typography gutterBottom>
            {conflictClassLesson.classTitle} has {conflictClassLesson.subject}{' '}
            with {conflictClassLesson.teacher} on{' '}
            {conflictClassLesson.dayOfTheWeek}{' '}
            {
              //@ts-ignore
              conflictClassLesson.period + 1
            }{' '}
            lesson
          </Typography>
        )}
        {conflictTeacherLesson && (
          <Typography gutterBottom>
            Teacher {conflictTeacherLesson.teacher} has{' '}
            {conflictTeacherLesson.subject} with{' '}
            {conflictTeacherLesson.classTitle} on{' '}
            {conflictTeacherLesson.dayOfTheWeek}{' '}
            {
              //@ts-ignore
              conflictTeacherLesson.period + 1
            }{' '}
            lesson
          </Typography>
        )}
        <Typography gutterBottom variant='h6'>
          Are you sure you want to replace it by:
        </Typography>
        {lesson && dropResult && (
          <Typography>
            {lesson.subject} with {lesson.teacher} in {lesson.classTitle} on{' '}
            {daysOfTheWeek[dropResult.dayNum]}{' '}
            {
              //@ts-ignore
              dropResult.period + 1
            }{' '}
            lesson
          </Typography>
        )}
      </DialogContent>

      <DialogActions>
        <Button variant='contained' onClick={handleClose} color='primary'>
          No
        </Button>
        <Button
          variant='contained'
          onClick={() => {
            replaceConfirm()
          }}
          color='secondary'>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  )
}
