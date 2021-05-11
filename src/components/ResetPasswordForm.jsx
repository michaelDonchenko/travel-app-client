import { TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { HiddenForm, StyledButton } from '../styled'
import styles from '../styles'
import { useDispatch } from 'react-redux'
import { getForgotPassword } from '../redux/actions/authActions'

const ResetPasswordForm = ({ show }) => {
  const [email, setEmail] = useState()
  const classes = styles()
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(getForgotPassword(email))
  }

  return (
    <HiddenForm show={show}>
      <p style={{ padding: '10px', color: 'gray' }}>
        Type your email in order to get password reset link
      </p>
      <form style={{ display: 'flex', justifyContent: 'center' }}>
        <TextField
          fullWidth
          label='Email'
          type='email'
          variant='standard'
          name='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={classes.inputField}
        />
      </form>
      <StyledButton onClick={handleSubmit} type='submit'>
        Send
      </StyledButton>
    </HiddenForm>
  )
}

export default ResetPasswordForm
