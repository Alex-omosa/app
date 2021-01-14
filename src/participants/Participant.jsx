import React from 'react';
//Material Ui
import Typography from '@material-ui/core/Typography';
import { ColorAssigner } from '@convergence/color-assigner';

const colorAssigner = new ColorAssigner(ColorAssigner.Palettes.LIGHT_12);
const color = 'teal';
function Participant({ participantInfo }) {
  const { sessionId, user } = participantInfo[0];
  const { displayName, email, firstName, lastName } = user;
  console.log(participantInfo);
  return (
    <div style={{ color: color }}>
      <Typography
        variant="body2"
        style={{
          color: color,
        }}
      >
        {displayName}
      </Typography>
    </div>
  );
}

export default Participant;
