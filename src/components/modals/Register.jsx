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
  closeRegisterModal,
  openLoginModal,
} from '../../redux/reducers/modalSlice'
import styles from '../../styles'
import { register } from '../../redux/actions/authActions'
import { authState } from '../../redux/reducers/authSlice'
import ModalToolbar from './ModalToolbar'
import { mapState } from '../../redux/reducers/mapSlice'

const Register = () => {
  const classes = styles()
  const dispatch = useDispatch()

  //state
  const modals = useSelector(modalState)
  const auth = useSelector(authState)
  const { registerModal } = modals
  const { message, loading } = auth

  //local state
  const [values, setValues] = useState({
    username: '',
    password: '',
    email: '',
  })

  const { username, password, email } = values

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleClsoe = () => {
    dispatch(closeRegisterModal())
  }

  const handleModalSwitch = () => {
    dispatch(closeRegisterModal())
    dispatch(openLoginModal())
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(register(values))
  }

  if (message) {
    handleClsoe()
  }

  const map = useSelector(mapState)
  const { windowWidth } = map

  return (
    <Dialog
      onClose={handleClsoe}
      open={registerModal}
      fullScreen={windowWidth < 600}
    >
      {windowWidth < 600 && <ModalToolbar handleClsoe={handleClsoe} />}

      <DialogTitle>
        <Typography variant='h6' align='center'>
          Register
        </Typography>
      </DialogTitle>

      <div>
        <form onSubmit={handleSubmit}>
          <div className={classes.flexCenter}>
            <TextField
              fullWidth
              label='Username'
              type='text'
              variant='standard'
              name='username'
              value={username}
              onChange={handleChange}
              className={classes.input}
            />

            <TextField
              fullWidth
              label='Email'
              type='email'
              variant='standard'
              name='email'
              value={email}
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
              {loading ? 'Loading...' : 'Register'}
            </Button>
          </div>
        </form>
        <p className={classes.input}>
          Already have account?
          <span onClick={handleModalSwitch} className={classes.modalLink}>
            Login
          </span>
        </p>
      </div>
    </Dialog>
  )
}

export default Register
