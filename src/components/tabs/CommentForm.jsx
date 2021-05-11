import { TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { StyledButton } from '../../styled'
import styles from '../../styles'
import { useDispatch, useSelector } from 'react-redux'
import { createComment } from '../../redux/actions/markerActions'
import { mapState } from '../../redux/reducers/mapSlice'

const CommentForm = () => {
  const classes = styles()
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()

  const state = useSelector(mapState)
  const { pinId } = state

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createComment({ pinId, body: comment }))
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        className={classes.inputField}
        type='text'
        placeholder='Comment'
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <StyledButton type='submit' primary>
        Submit
      </StyledButton>
    </form>
  )
}

export default CommentForm
