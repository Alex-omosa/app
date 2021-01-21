import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';

import Participant from './Participant';

function ParticipantsList({ activity }) {
  const [participants, setParticipants] = useState([]);
  useEffect(() => {
    // Listen on any change
    activity.participantsAsObservable().subscribe((ActivityParticipant) => {
      setParticipants(ActivityParticipant); // ActivityParticipant[]
    });
    //Todo: Listen when a new user is added
  }, [activity]);

  return (
    <div>
      {/*
       **participants contains an array of arrays
       *so participants.map() map an array to each Participant component
       *
       */}
      {participants.map((participant, i) => (
        //participant is an array
        <Participant key={i} participantInfo={participant} />
      ))}
    </div>
  );
}

ParticipantsList.propTypes = {
  activity: propTypes.object.isRequired,
};

export default ParticipantsList;
