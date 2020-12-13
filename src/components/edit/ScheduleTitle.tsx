import { TextField } from '@material-ui/core'
import React, { FC, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { updateFieldAC } from '../../redux/schedules/sched.actions'
import { useStylesEdit } from '../../styles/stylesForEdit'

type ScheduleTitleProps = {
  propTitle: string
}

type InputT = {
  title: string
}
export const ScheduleTitle: FC<ScheduleTitleProps> = ({
  propTitle,
}) => {
  const classes = useStylesEdit()

  const { register, handleSubmit, watch } = useForm<InputT>({
    defaultValues: {
      title: propTitle,
    },
  })

  const scheduleTitleRef = useRef<HTMLInputElement | null>(null)

  const dispatch = useDispatch()

  const onSubmit = ({ title }: InputT) => {
    if (title !== propTitle) {
      dispatch(updateFieldAC('title', title))
    }
    if (scheduleTitleRef.current) {
      scheduleTitleRef.current.blur()
    }
  }

  const onFocus = () => {
    if (scheduleTitleRef.current) {
      scheduleTitleRef.current.select()
    }
  }

  const watchTitle: string = watch('title')

  const onBlur = () => {
    if (watchTitle !== propTitle) {
      dispatch(updateFieldAC('title', watchTitle))
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete='off'>
      <TextField
        className={classes.titleInput}
        name='title'
        type='text'
        id='title'
        size='small'
        variant='outlined'
        inputRef={(e) => {
          register(e)
          scheduleTitleRef.current = e
        }}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </form>
  )
}
