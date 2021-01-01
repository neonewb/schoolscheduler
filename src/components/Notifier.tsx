import React, { FC, useEffect } from 'react'
import { useSnackbar } from 'notistack'
import { useStore } from 'effector-react'
import {
  closeSnackbar,
  enqueueSnackbar,
  Notice,
  notifyStore,
  removeSnackbar,
} from '../effector/notifier'
import { IconButton } from '@material-ui/core'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'
import { nanoid } from 'nanoid'

export const showSnack = (
  message: Notice['message'],
  variant: Notice['options']['variant']
) => {
  const key = nanoid()
  enqueueSnackbar({
    message: message,
    key,
    dismissed: false,
    options: {
      key,
      variant,
      anchorOrigin: {
        horizontal: 'right',
        vertical: 'bottom',
      },
      action: (key) => (
        <IconButton onClick={() => closeSnackbar(key)}>
          <CloseRoundedIcon />
        </IconButton>
      ),
    },
  })
}

let displayed: string[] = []

export const Notifier: FC = () => {
  const notifications = useStore(notifyStore)
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const storeDisplayed = (id: string) => {
    displayed = [...displayed, id]
  }

  const removeDisplayed = (id: string) => {
    displayed = [...displayed.filter((key) => id !== key)]
  }

  useEffect(() => {
    notifications.forEach(
      ({ key, message, options = {}, dismissed = false }) => {
        // dismiss snackbar using notistack
        if (dismissed) {
          closeSnackbar(key)
          return
        }

        // do nothing if snackbar is already displayed
        if (displayed.includes(key)) return

        // display snackbar using notistack
        enqueueSnackbar(message, {
          key,
          ...options,
          onClose: (event, reason, myKey) => {
            if (options.onClose) {
              //@ts-ignore
              options.onClose(event, reason, myKey)
            }
          },
          onExited: (event, myKey) => {
            // remove this snackbar from store
            //@ts-ignore
            removeSnackbar(myKey)
            //@ts-ignore
            removeDisplayed(myKey)
          },
        })

        // keep track of snackbars that we've displayed
        storeDisplayed(key)
      }
    )
  }, [notifications, closeSnackbar, enqueueSnackbar])

  return null
}
