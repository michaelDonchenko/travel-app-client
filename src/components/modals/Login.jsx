import {
  Button,
  Dialog,
  DialogTitle,
  TextField,
  Typography,
} from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  modalState,
  closeLoginModal,
  openRegisterModal,
} from '../../redux/reducers/modalSlice'
import styles from '../../styles'
import { login } from '../../redux/actions/authActions'
import { authState } from '../../redux/reducers/authSlice'
import Cookies from 'universal-cookie'
import ResetPasswordForm from '../ResetPasswordForm'
import { mapState } from '../../redux/reducers/mapSlice'
import ModalToolbar from './ModalToolbar'

const Login = () => {
  const cookies = new Cookies()
  const classes = styles()
  const dispatch = useDispatch()

  //states
  const modals = useSelector(modalState)
  const auth = useSelector(authState)
  const map = useSelector(mapState)
  const { loginModal } = modals
  const { user, loading, message } = auth
  const { windowWidth } = map

  const [values, setValues] = useState({
    username: '',
    password: '',
  })

  const { username, password } = values

  const [showPasswordReset, setShowPasswordReset] = useState(false)

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleClsoe = () => {
    dispatch(closeLoginModal())
  }

  const handleModalSwitch = () => {
    dispatch(closeLoginModal())
    dispatch(openRegisterModal())
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(login(values))
  }

  if (message === 'Logged in succefully') {
    cookies.set('user', user)
    handleClsoe()
  }

  return (
    <Dialog
      onClose={handleClsoe}
      open={loginModal}
      fullScreen={windowWidth < 600}
    >
      {windowWidth < 600 && <ModalToolbar handleClsoe={handleClsoe} />}

      <DialogTitle>
        <Typography variant='h6' align='center'>
          Login
        </Typography>
      </DialogTitle>

      <div>
        <form onSubmit={handleSubmit}>
          <div className={classes.flexCenter}>
            <TextField
              fullWidth
              label='Username'
              name='username'
              value={username}
              type='text'
              variant='standard'
              onChange={handleChange}
              className={classes.input}
            />

            <TextField
              fullWidth
              label='Password'
              type='password'
              variant='standard'
              name='password'
              value={password}
              onChange={handleChange}
              className={classes.input}
            />

            <Button
              variant='contained'
              color='primary'
              type='submit'
              className={classes.popupButton}
            >
              {loading ? 'Loading...' : 'Login'}
            </Button>
          </div>
        </form>
        <p className={classes.input}>
          Don't have an account?
          <span onClick={handleModalSwitch} className={classes.modalLink}>
            Register
          </span>
        </p>

        <p className={classes.input}>
          Can't login? click
          <span
            onClick={() => setShowPasswordReset(!showPasswordReset)}
            className={classes.modalLink}
          >
            Here
          </span>
        </p>
      </div>

      <ResetPasswordForm show={showPasswordReset} />
    </Dialog>
  )
}

export default Login
