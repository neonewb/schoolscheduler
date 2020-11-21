import React, { useState } from 'react'
import { Checkbox, TextField } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'

const LoadMultipleAutocomplete = ({ options, label, handleNewLoad }) => {
  const [value, setValue] = useState([])

  const handleChange = (newValue) => {
    handleNewLoad(label.toLowerCase(), newValue)
    setValue(newValue)
  }

  return (
    <Autocomplete
      multiple
      disableCloseOnSelect
      limitTags={1}
      size='small'
      openOnFocus
      autoComplete
      autoHighlight
      includeInputInList
      selectOnFocus
      handleHomeEndKeys
      options={options}
      value={value}
      renderOption={(option, { selected }) => (
        <React.Fragment>
          <Checkbox color='primary' checked={selected} />
          {option}
        </React.Fragment>
      )}
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

export default LoadMultipleAutocomplete
