import React, { useState } from 'react'
import { TextField } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'

const LoadAutocomplete = ({ options, label, handleNewLoad }) => {
  if (options === 'numbers') {
    options = [...Array(11).keys()].map(String).slice(1)
  }

  const [value, setValue] = useState('')

  const handleChange = (newValue) => {
    handleNewLoad(label.toLowerCase(), newValue)
    setValue(newValue)
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
