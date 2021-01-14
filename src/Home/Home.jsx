import React from 'react';
import PropTypes from 'prop-types';
import Editor from './../Editor';
import { StatusBar } from './../TopBar';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

//
import ParticipantsList from './../participants/ParticipantsList';

function Home({
  rtModel,
  chatRoom,
  domain,
  activity,
  user,
  onLogout,
  onClose,
}) {
  const displayName = user.displayName ? user.displayName : user.username;
  return (
    <div>
      <StatusBar username={displayName} onClose={onClose} onLogout={onLogout} />

      <Grid container spacing={0}>
        <Grid item xs={2}>
          {/**
           * The File Manager Section
           */}
          <Paper square>File Manager</Paper>
          {/**
           * End of the File Manager Section
           */}
        </Grid>

        <Grid item xs={8}>
          {/**
           * Center Panel
           */}
          <Paper square>
            <Editor />
          </Paper>
          {/**
           * End of Center Panel
           */}
        </Grid>

        <Grid item xs={2}>
          {/*
           * Chat and Participants Panel
           */}
          <Paper square>
            <div>Participants</div>
            <ParticipantsList activity={activity} />
            <div>Chat</div>
          </Paper>
          {/**
           *End of Chat and Participants Panel
           */}
        </Grid>
      </Grid>
    </div>
  );
}

Home.propTypes = {
  activity: PropTypes.object.isRequired,
  chatRoom: PropTypes.object.isRequired,
  domain: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  rtModel: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default Home;
