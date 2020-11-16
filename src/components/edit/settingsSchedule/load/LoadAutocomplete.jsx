import React, { useState } from 'react'
import { TextField } from '@material-ui/core'

import Autocomplete from '@material-ui/lab/Autocomplete'

const LoadAutocomplete = ({options, label}) => {
  if (!options) {
    options = [...Array(10).keys()].map(String)
    console.log(options);
  }

  const [value, setValue] = useState('')
  const [inputValue, setInputValue] = useState('')

  const handleChange = (newValue) => {
    // dispatch(setSubjectAC(newValue))
    setValue(newValue)
  }

  const handleInputChange = (newValue) => {
    setInputValue(newValue)
  }

  return (
    <Autocomplete
      openOnFocus
      autoComplete
      includeInputInList
      disableCloseOnSelect
      clearOnEscape
      selectOnFocus
      handleHomeEndKeys
      options={options}
      value={value}
      onChange={(newValue) => {
        handleChange(newValue)
      }}
      inputValue={inputValue}
      onInputChange={(newInputValue) => {
        handleInputChange(newInputValue)
      }}
      style={{ width: 223 }}
      renderInput={(params) => (
        <TextField
          {...params}
          size='small'
          label={label}
          variant='outlined'
        />
      )}
    />
  )
}

export default LoadAutocomplete
