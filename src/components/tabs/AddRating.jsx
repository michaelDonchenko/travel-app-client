import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import React, { useState } from 'react'
import styles from '../../styles'
import { StyledButton } from '../../styled'
import { useDispatch, useSelector } from 'react-redux'
import { addRating } from '../../redux/actions/markerActions'
import { mapState } from '../../redux/reducers/mapSlice'

const AddRating = () => {
  const classes = styles()
  const dispatch = useDispatch()
  const [rating, setRating] = useState('')

  const map = useSelector(mapState)
  const { pinId } = map

  const handleChange = (e) => {
    setRating(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(addRating({ pinId, value: rating }))
  }
  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
        <InputLabel id='demo-simple-select-label'>Rate</InputLabel>
        <Select
          className={classes.inputField}
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={rating}
          onChange={handleChange}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
        </Select>

        <StyledButton type='submit' primary>
          Submit
        </StyledButton>
      </FormControl>
    </form>
  )
}

export default AddRating
