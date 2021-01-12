import React from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import NewProjectDialog from './NewProjectDialog';

const PROJECT_COLLECTION_ID = 'projects';

function ProjectDialog({ collectionId, onOpen, modelService, onLogout }) {
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

  function handleDelete() {}
  function handleOpen() {}
  return (
    <Container component="main" maxWidth="xs">
      <div>
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
