import './App.css';
import Login from './components/login/login'
import { useDispatch, useSelector } from 'react-redux';

import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { cmpType } from './constants'
import SignUp from './components/login/Signup';
import { snackBarAction } from './reducers/loginReducer';
import Overview from './components/overview/Overview'

const { LOGIN, SIGNIN } = cmpType


function App() {
  const CurrentComponent = useSelector((state) => state.main.component)
  const snackBar = useSelector((state) => state.main.snackBarData)
  console.log('state:', snackBar)
  const dispatch = useDispatch()
  const handleClosesnackBar = () => {
    dispatch(snackBarAction({ open: false, message: '' }))
  }

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClosesnackBar}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClosesnackBar}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div className="App">
      <Snackbar
        open={snackBar.open}
        autoHideDuration={6000}
        onClose={handleClosesnackBar}
        message={snackBar.message}
        action={action}
      />
      {CurrentComponent === LOGIN ? (
        <Login />
      ) : CurrentComponent === SIGNIN ? (
        <SignUp />
      ) : (
        <Overview />
      )}
    </div>
  );
}

export default App;
