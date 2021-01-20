import React, { useState } from 'react';
import propTypes from 'prop-types';
//Material-UI
//Matrial-UI
import ProjectItem from './ProjectItem';
// import { FixedSizeList } from 'react-window';
function ProjectList({ onSelect, loaded, projects, onOpen }) {
  const [selectedId, setSelectedId] = useState(null);

  function handleProjectDoubleClick() {}
  function handleProjectClick(projectId) {
    setSelectedId(projectId);
    onSelect(projectId);
  }
  if (loaded) {
    return projects.map((project) => {
      return (
        <ProjectItem
          key={project.id}
          project={project}
          selected={selectedId === project.id}
          onClick={handleProjectClick}
          onDoubleClick={handleProjectDoubleClick}
        />
      );
    });
  } else {
    return <div>Loading...</div>;
  }
}

ProjectList.propTypes = {
  loaded: propTypes.bool.isRequired,
  onOpen: propTypes.func.isRequired,
  onSelect: propTypes.func.isRequired,
  projects: propTypes.array.isRequired,
};
export default ProjectList;
