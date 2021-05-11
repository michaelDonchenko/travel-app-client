import { makeStyles } from '@material-ui/core'

const styles = makeStyles((theme) => ({
  toolBar: {
    minHeight: '40px',
  },

  menuButton: {
    margin: '1rem',
    display: 'flex',
    width: '150px',
    fontWeight: '600',
    fontSize: '1rem',
  },

  mapPopup: {
    padding: theme.spacing(2),
  },

  popupButton: {
    margin: theme.spacing(2, 'auto'),
    padding: theme.spacing(1, 3),
    display: 'flex',
    width: 'fit-content',
    fontWeight: '600',
    fontSize: '1rem',
  },

  input: {
    width: '350px',
    margin: theme.spacing(2),
    maxWidth: '90%',
  },

  flexCenter: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },

  modalLink: {
    color: '#263238',
    fontWeight: '600',
    margin: theme.spacing(0, 1),
    '&:hover': {
      textDecoration: 'underline',
      cursor: 'pointer',
    },
  },

  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}))

export default styles
