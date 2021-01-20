import React from 'react';
//Material-UI
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FolderIcon from '@material-ui/icons/Folder';
//End of  Material-UI

function ProjectItem({ project, selected, onClick, onDoubleClick }) {
  const { name, id } = project;
  function handleClick() {
    onClick(id);
  }
  function handleDoubleClick() {
    onDoubleClick(id);
  }
  const color = selected ? 'teal' : 'black';
  return (
    <ListItem
      button
      style={{ color }}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      <ListItemIcon>
        <FolderIcon />
      </ListItemIcon>
      <ListItemText primary={name} />
    </ListItem>
  );
}

export default ProjectItem;
