import React, { FC } from 'react'
import Switch from '@material-ui/core/Switch'
import { FormControlLabel, Grid, withStyles } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

const CustomSwitch = withStyles((theme) => ({
  switchBase: {
    color: theme.palette.primary.main,
    '&$checked': {
      color: theme.palette.secondary.main,
      '& .MuiTouchRipple-child': {
        backgroundColor: theme.palette.secondary.main,
      },
    },
    '&$checked + $track': {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  checked: {},
  track: {
    backgroundColor: theme.palette.primary.main,
  },
}))(Switch)

type Props = {}

export const SwitchLanguage: FC<Props> = () => {
  const { i18n } = useTranslation()

  const [checked, setChecked] = React.useState(false)

  const handleChangeLng = () => {
    if (checked) {
      i18n.changeLanguage('en')
    } else {
      i18n.changeLanguage('ru')
    }
    setChecked((checked) => !checked)
  }

  return (
    <Grid container justify='center' alignItems='center'>
      <FormControlLabel
        control={<CustomSwitch checked={checked} onChange={handleChangeLng} />}
        label='ENG / RU'
      />
    </Grid>
  )
}
