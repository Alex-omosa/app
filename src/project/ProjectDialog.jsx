import React, { useEffect, useState } from 'react';
//Matrial-UI
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import DeleteIcon from '@material-ui/icons/Delete';
import ButtonGroup from '@material-ui/core/ButtonGroup';
//Material-UI
import NewProjectDialog from './NewProjectDialog';
import ProjectList from './ProjectList';

//Check!!!
const PROJECT_COLLECTION_ID = 'projects';

function ProjectDialog({ collectionId, onOpen, modelService, onLogout }) {
  const [projects, setProjects] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [selected, setSelected] = useState(null);
  useEffect(() => {
    // To avoid memory leaks
    let isSubscribed = true;
    (async function loadProjects() {
      /*
       *modelService.query returns the set of models matching the query via a promise.
       */ const results = await modelService.query(
        `SELECT FROM ${PROJECT_COLLECTION_ID}`
      );
      const loadedProjects = results.data.map((model) => {
        return {
          name: model.data.name,
          created: model.created,
          id: model.modelId,
        };
      });
      if (isSubscribed === true) {
        // To avoid memory leaks
        //Prevent updating state after the component has unmounted
        setProjects(loadedProjects);
      }
    })().then(() => setLoaded(true));

    //Clean up function below . To avoid memory leaks
    return () => (isSubscribed = false);
  }, [modelService, projects]);

  async function handleOpenProject(modelId) {
    // set opening to true.//Loading opening

    /*
     *To work with an existing model in real time you must open it.
     *modelService.open() returns a realTime Model
     */
    const model = await modelService.open(modelId);
    //IDEA?? We can also persist this realTime Model to the
    //Redux Store instead of drilling it down
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
  function handleDelete() {
    //Deleting a model
    modelService.remove(selected);
  }
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
        <ButtonGroup variant="contained">
          <Button
            disabled={selected === null}
            color="primary"
            onClick={handleOpen}
          >
            open
          </Button>
          {/*
           *Button to open dialog for creating a new project
           */}
          <NewProjectDialog onOk={handleNewProjectOk} />
          {/*
           *Button to open dialog for creating a new project
           */}
          <Button
            disabled={selected === null}
            color="secondary"
            onClick={handleDelete}
            startIcon={<DeleteIcon />}
          >
            delete
          </Button>
        </ButtonGroup>
      </div>
    </Container>
  );
}

export default ProjectDialog;
