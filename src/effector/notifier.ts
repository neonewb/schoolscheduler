import { createEvent, createStore } from 'effector'

export type Notice = {
  message: string
  dismissed: boolean
  key: string
  options: {
    anchorOrigin: {
      horizontal: 'left' | 'center' | 'right'
      vertical: 'top' | 'bottom'
    }
    key: string
    variant: 'default' | 'error' | 'success' | 'warning' | 'info' | undefined
    action?: (key: string) => void
    onClose?: () => void
    onExited?: () => void
  }
}

export const notifyStore = createStore<Notice[]>([])

export const enqueueSnackbar = createEvent<Notice>()
export const closeSnackbar = createEvent<string>()
export const removeSnackbar = createEvent<string>()

const addSnack = (state: Notice[], notification: Notice) => {
  return [
    ...state,
    {
      //@ts-ignore
      key: notification.options.key,
      ...notification,
    },
  ]
}

const closeSnack = (state: Notice[], key: string) => {
  return [
    ...state.map((note) =>
      note.key === key ? { ...note, dismissed: true } : note
    ),
  ]
}

const delSnack = (state: Notice[], key: string) => {
  return [...state.filter((note) => note.key !== key)]
}

notifyStore.on(enqueueSnackbar, addSnack)
notifyStore.on(closeSnackbar, closeSnack)
notifyStore.on(removeSnackbar, delSnack)
