import React from 'react'
import moment from 'moment'
import { Paper, Typography } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import { Icon } from '../styled'
import { useSelector, useDispatch } from 'react-redux'
import { removeComment } from '../redux/actions/markerActions'
import { authState } from '../redux/reducers/authSlice'
import { mapState } from '../redux/reducers/mapSlice'

const Comment = ({ comment }) => {
  const { body, postedBy, createdAt, createdBy, _id } = comment

  const auth = useSelector(authState)
  const map = useSelector(mapState)

  const { pinId } = map
  const { user } = auth

  const dispatch = useDispatch()

  const myConfirm = () => {
    if (window.confirm('Are you sure you wnat to delete this message?')) {
      return dispatch(removeComment({ pinId, commentId: _id }))
    }
    return
  }

  return (
    <Paper style={{ marginBottom: '15px', padding: '5px' }} elevation={3}>
      <Typography variant='h6'>{`${postedBy}'s comment:`}</Typography>
      <Typography style={{ margin: '5px 0' }} variant='subtitle1'>
        {body}
      </Typography>
      <Typography variant='subtitle1' style={{ color: 'GrayText' }}>
        {moment(createdAt).format('MMMM Do YYYY')}
        {user?._id === createdBy && (
          <Icon onClick={myConfirm} color={'crimson'}>
            <DeleteIcon />
          </Icon>
        )}
      </Typography>
    </Paper>
  )
}

export default Comment
