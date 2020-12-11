import React, { FC, useState } from 'react'
import { TextField } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'

type LoadAutocompletePropsT = {
  options: string[]
  label: string
  handleNewLoad: (key: string, value: string) => void
}

const LoadAutocomplete: FC<LoadAutocompletePropsT> = ({
  options,
  label,
  handleNewLoad,
}) => {
  const [value, setValue] = useState('')

  const handleChange = (newValue: string | null) => {
    if (newValue) {
      handleNewLoad(label.toLowerCase(), newValue)
      setValue(newValue)
    } else {
      handleNewLoad(label.toLowerCase(), '')
      setValue('')
    }
  }

  return (
    <Autocomplete
      openOnFocus
      autoComplete
      autoSelect
      autoHighlight
      includeInputInList
      clearOnEscape
      selectOnFocus
      handleHomeEndKeys
      options={options}
      value={value}
      onChange={(event, newValue) => {
        handleChange(newValue)
      }}
      style={{ width: 223 }}
      renderInput={(params) => (
        <TextField {...params} size='small' label={label} variant='outlined' />
      )}
    />
  )
}

export default LoadAutocomplete
