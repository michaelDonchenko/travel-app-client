import React from 'react'
import CloseIcon from '@material-ui/icons/Close'
import { IconButton, Toolbar } from '@material-ui/core'

const ModalToolbar = ({ handleClsoe }) => {
  return (
    <Toolbar>
      <IconButton
        edge='start'
        color='inherit'
        onClick={handleClsoe}
        aria-label='close'
      >
        <CloseIcon />
      </IconButton>
    </Toolbar>
  )
}

export default ModalToolbar
