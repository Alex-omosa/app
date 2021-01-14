import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import NewProjectDialog from './NewProjectDialog';
import ProjectList from './ProjectList';

const PROJECT_COLLECTION_ID = 'projects';

function ProjectDialog({ collectionId, onOpen, modelService, onLogout }) {
  const [projects, setProjects] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [selected, setSelected] = useState(null);
  useEffect(() => {
    (async function loadProjects() {
      const results = await modelService.query(
        `SELECT FROM ${PROJECT_COLLECTION_ID}`
      );
      const loadedProjects = results.data.map((model) => {
        return {
          name: model.data.name,
          id: model.modelId,
        };
      });
      setProjects(loadedProjects);
      setLoaded(true);
    })();
  }, []);
  console.log('loaded', projects);

  async function handleOpenProject(modelId) {
    // set opening to true.
    const model = await modelService.open(modelId);
    onOpen(model);
  }

  async function handleNewProjectOk(projectName) {
    const modelId = await modelService.create({
      collection: PROJECT_COLLECTION_ID,
      data: {
        name: projectName,
        tree: {
          nodes: {
            root: {
              name: projectName,
              children: [],
            },
          },
        },
      },
    });

    handleOpenProject(modelId);
  }
  function handleSelectProject(projectId) {
    setSelected(projectId);
  }
  function handleDelete() {}
  function handleOpen() {
    handleOpenProject(selected);
  }
  return (
    <Container component="main" maxWidth="xs">
      <ProjectList
        projects={projects}
        onOpen={handleOpenProject}
        onSelect={handleSelectProject}
        loaded={loaded}
      />

      <div>
        <button
          disabled={selected === null}
          className="app-button"
          onClick={handleOpen}
        >
          Open
        </button>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          open
        </Button>
        {/*
         *Button to open dialog for creating a new project
         */}

        <NewProjectDialog onOk={handleNewProjectOk} />

        {/*
         *Button to open dialog for creating a new project
         */}
        <Button variant="contained" color="primary" onClick={handleDelete}>
          delete
        </Button>
      </div>
    </Container>
  );
}

export default ProjectDialog;
