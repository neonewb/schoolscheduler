import React, { FC } from 'react'
import Switch from '@material-ui/core/Switch'
import { Grid, Typography, withStyles } from '@material-ui/core'
import { red } from '@material-ui/core/colors'
import { useTranslation } from 'react-i18next'

const CustomSwitch = withStyles((theme) => ({
  switchBase: {
    color: red[500],
    '& .MuiTouchRipple-child': {
      backgroundColor: red[500],
    },
    '&$checked': {
      color: theme.palette.primary.main,
      // '& .MuiTouchRipple-child': {
        // backgroundColor: theme.palette.primary.main,
      // },
    },
    '&$checked + $track': {
      backgroundColor: theme.palette.primary.main,
    },
  },
  checked: {
  },
  track: {
    backgroundColor: red[500],
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
      <Typography>ENG</Typography>
      <CustomSwitch checked={checked} onChange={handleChangeLng} />
      <Typography>RU</Typography>
    </Grid>
  )
}
