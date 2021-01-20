import React from 'react';
//Material Ui
import Typography from '@material-ui/core/Typography';
// import { ColorAssigner } from '@convergence/color-assigner';

// const colorAssigner = new ColorAssigner(ColorAssigner.Palettes.LIGHT_12);
const color = 'teal';
function Participant({ participantInfo }) {
  const { user } = participantInfo[0];
  const { displayName } = user; // email, firstName, lastName
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
