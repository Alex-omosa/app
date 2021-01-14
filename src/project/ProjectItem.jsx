import React from 'react';

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
    <div
      style={{ color }}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      {name}
    </div>
  );
}

export default ProjectItem;
