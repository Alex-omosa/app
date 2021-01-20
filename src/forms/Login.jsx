import React, { useState, useEffect } from 'react';
import Convergence from '@convergence/convergence';

//Matertial UI
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
//End of Matertial UI

export default function Login({ domainUrl, onLogin }) {
  const [user, setUser] = useState({
    inProgress: false,
    username: '',
    password: '',
    anonymous: window.CodeEditorConfig.ANONYMOUS_AUTH,
  });
  useEffect(() => {});
  function handleUsername(e) {
    setUser({ ...user, username: e.target.value });
  }
  function handlePassword(e) {
    setUser({ ...user, password: e.target.value });
  }
  function toggleAnonymousLogin() {
    setUser({ ...user, anonymous: !user.anonymous });
  }

  function handleSubmit(e) {
    handleLogin(domainUrl);
    setUser({ ...user, username: '', password: '' });
  }

  async function handleLogin(domainUrl) {
    setUser({ ...user, inProgress: true });

    if (user.anonymous) {
      /*
       *If user is anonymous connect to the server anonymously
       */
      try {
        const domain = await Convergence.connectAnonymously(
          domainUrl,
          user.username
        );
        /*
         *IDEA?? domain object is returned from the Convergence.connectAnonymously() above,
         *I can persist The domain object to the REDUX store!!
         */
        onLogin(domain);
      } catch (error) {
        console.error(
          'Connecting to the Convergence server Anonymously,(Convergence.connectAnonymously) FAILED! ',
          error
        );
      }
    } else {
      try {
        /*
         *Connect to the server
         */
        const domain = await Convergence.connect(
          domainUrl,
          user.username,
          user.password
        );
        /*
         *IDEA?? domain object is returned from the Convergence.connect() above,
         *I can persist The domain object to the REDUX store!!
         */
        onLogin(domain);
      } catch (error) {
        console.error(
          'Connecting to the Convergence server,(Convergence.connect) FAILED! ',
          error
        );
      }
    }
  }
  return (
    <Container component="main" maxWidth="xs">
      <FormControlLabel
        control={
          <Switch
            checked={user.anonymous}
            onChange={toggleAnonymousLogin}
            name="isAnonymous"
          />
        }
        label="Sign in anonymously"
      />

      <Typography component="h1" variant="h5">
        Welcome !
      </Typography>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="username"
        label={user.anonymous ? 'Display Name' : 'Username'}
        name="username"
        autoComplete="username"
        autoFocus
        value={user.username}
        onChange={handleUsername}
      />
      {/*
       * If user is signing in anonymously
       * Don't show the password Field,
       */}
      <TextField
        style={{ display: user.anonymous ? 'none' : 'block' }}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        value={user.password}
        onChange={handlePassword}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleSubmit}
      >
        Sign In
      </Button>
    </Container>
  );
}
