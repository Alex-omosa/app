import React from 'react';
//Material Ui
// import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import { ColorAssigner } from '@convergence/color-assigner';

const colorAssigner = new ColorAssigner(ColorAssigner.Palettes.LIGHT_12);

// const color = 'teal';
function Participant({ participantInfo }) {
  const { user, sessionId } = participantInfo;
  const { displayName } = user; // email, firstName, lastName
  return <Chip style={{
color: colorAssigner.getColorAsHex(sessionId)

  }} label={displayName} />;
}
export default Participant;
