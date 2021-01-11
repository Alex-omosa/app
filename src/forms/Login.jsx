import React, { useState } from 'react';
import Convergence from '@convergence/convergence';

//Matertial UI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
//End of Matertial UI

export default function Login({ domainUrl, onLogin }) {
  const [user, setUser] = useState({
    inProgress: false,
    username: '',
    password: '',
    anonymous: window.CodeEditorConfig.ANONYMOUS_LOGIN,
  });
  function handleUsername(e) {
    setUser({ ...user, username: e.target.value });
  }
  function handlePassword(e) {
    setUser({ ...user, password: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    handleLogin();
    setUser({ ...user, username: '', password: '' });
  }

  async function handleLogin() {
    setUser({ ...user, inProgress: true });
    //TODO: ERROR HANDLING
    if (user.anonymous) {
      const domain = await Convergence.connectAnonymously(
        domainUrl,
        user.username
      );
      onLogin(domain);
    } else {
      const domain = await Convergence.connect(
        domainUrl,
        user.username,
        user.password
      );
      onLogin(domain);
    }
  }
  return (
    <Container component="main" maxWidth="xs">
      <div>
        <Typography component="h1" variant="h5">
          Sign in
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
      </div>
    </Container>
  );
}
