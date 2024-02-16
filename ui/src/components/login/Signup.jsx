import * as React from 'react';
import { useDispatch } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { cmpType, validateEmail } from '../../constants'
import { setComponent } from '../../reducers/loginReducer';

import { snackBarAction } from '../../reducers/loginReducer';

import axios from 'axios';

const defaultTheme = createTheme();
const { LOGIN } = cmpType
export default function SignUp() {
  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let email = data.get('email')
    let password = data.get('password')
    let firstName = data.get('firstName')
    let lastName = data.get('lastName')
    if (firstName === "") {
      dispatch(snackBarAction({
        open: true,
        message: 'First name cant be empty!'
      }))
      return
    }
    if (lastName === "") {
      dispatch(snackBarAction({
        open: true,
        message: 'Last name cant be empty!'
      }))
      return
    }
    if (email === "") {
      dispatch(snackBarAction({
        open: true,
        message: 'Email cant be empty!'
      }))
      return
    }
    if (!validateEmail(email)) {
      dispatch(snackBarAction({
        open: true,
        message: 'Enter correct email address'
      }))
      return
    }
    if (password === "") {
      dispatch(snackBarAction({
        open: true,
        message: 'Password cant be empty!'
      }))
      return
    }

    let payload = {
      "first_name": firstName,
      "last_name": lastName,
      "email": email,
      "is_superuser": 1,
      "is_staff": 1,
      "is_active": 1,
      "password": password
    }
    axios({
      method: 'post',
      url: 'api/register/',
      headers: {},
      data: payload
    }).then((res) => {
      if (res.status === 200 && res.data.succes) {
        dispatch(snackBarAction({
          open: true,
          message: "Welcome to Quick chat please log in"
        }))
        dispatch(setComponent(LOGIN))
      }
    }).catch((e) => {
      console.log(e)
      dispatch(snackBarAction({
        open: true,
        message: e.response.data.message
      }))
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"

                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I agree to Terms and Conditions for Quick Chat"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link onClick={() => { dispatch(setComponent(LOGIN)) }} href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}