import {
  Backdrop,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from '@material-ui/core'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authState } from '../redux/reducers/authSlice'
import {
  resetPasswordValidation,
  createResetPassword,
} from '../redux/actions/authActions'
import { useParams } from 'react-router-dom'
import styles from '../styles'
import { StyledButton, FlexDiv } from '../styled'

const PasswordReset = () => {
  const classes = styles()
  const dispatch = useDispatch()
  const auth = useSelector(authState)
  const {
    resetPasswordSuccess,
    resetPasswordError,
    loading,
    error,
    message,
  } = auth

  const params = useParams()
  const { token } = params

  const [values, setvalues] = useState({
    password: '',
    confirmPassword: '',
  })

  const { password, confirmPassword } = values
  const handleChange = (e) => {
    setvalues({ ...values, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await dispatch(
      createResetPassword({
        password,
        confirmPassword,
        resetPasswordToken: token,
      })
    )
  }

  const displayError = () => {
    if (error) {
      return (
        <Typography
          variant='subtitle1'
          align='center'
          style={{ margin: '20px 0', color: 'red' }}
        >
          {error}
        </Typography>
      )
    }
  }

  const displaySuccess = () => {
    if (message) {
      return (
        <Typography
          variant='subtitle1'
          align='center'
          style={{ margin: '20px 0', color: 'green' }}
        >
          {message}
        </Typography>
      )
    }
  }

  useEffect(() => dispatch(resetPasswordValidation(token)), [])

  return (
    <div>
      <Container maxWidth='sm'>
        <Typography variant='h5' align='center' style={{ margin: '20px 0' }}>
          Reset password page
        </Typography>

        {loading && (
          <Backdrop className={classes.backdrop} open={loading}>
            <CircularProgress color='inherit' />
          </Backdrop>
        )}

        {resetPasswordSuccess && (
          <form onSubmit={handleSubmit}>
            <FlexDiv>
              <Typography
                variant='subtitle1'
                align='center'
                style={{ margin: '20px 0', color: 'green' }}
              >
                {resetPasswordSuccess}
              </Typography>

              <TextField
                fullWidth
                label='New Password'
                type='password'
                variant='standard'
                name='password'
                value={password}
                onChange={handleChange}
                className={classes.inputField}
              />

              <TextField
                fullWidth
                label='Confirm Password'
                type='password'
                variant='standard'
                name='confirmPassword'
                value={confirmPassword}
                onChange={handleChange}
                className={classes.inputField}
              />

              <StyledButton
                style={{ margin: '20px auto' }}
                primary
                type='submit'
              >
                Submit
              </StyledButton>
            </FlexDiv>
          </form>
        )}

        {displayError()}
        {displaySuccess()}

        {resetPasswordError && (
          <Typography
            variant='subtitle1'
            align='center'
            style={{ margin: '20px 0', color: 'red' }}
          >
            {resetPasswordError}
          </Typography>
        )}
      </Container>
    </div>
  )
}

export default PasswordReset
