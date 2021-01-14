import React, { useState, useEffect } from 'react';
import { closeAll } from './actions/actionCreators';
import Login from './forms/Login';
import ProjectDialog from './project/ProjectDialog';
import Home from './Home/Home';

// Try autoLogin
// import { getUrlParam } from '../utils';

function App({ domainUrl }) {
  const [domain, setDomain] = useState(null);
  const [projectData, setProjectData] = useState(null);

  useEffect(() => {
    // on component Did mount try auto login
    tryAutoLogin();
  }, []);

  function handleLogin(domain) {
    setDomain(domain);
  }

  function tryAutoLogin() {
    console.log('trying auto login');
  }
  function handleOpenProject(model) {
    /**
     * Extracts  model, activity,chatRoom,user
     *From the model and puts them in the projectData variable
     */
    let activity = null;
    let chatRoom = null;

    Promise.all([
      domain
        .activities()
        .join(model.modelId())
        .then((a) => (activity = a)),

      domain
        .chat()
        .create({
          id: model.modelId(),
          type: 'room',
          membership: 'public',
          ignoreExistsError: true,
        })
        .then((channelId) => domain.chat().join(channelId))
        .then((c) => (chatRoom = c)),
    ])
      .then(() => {
        const projectData = {
          model,
          activity,
          chatRoom,
          user: model.session().user(),
        };
        setProjectData(projectData);
      })
      .catch((e) => {
        console.error(e);
      });
  }

  function handleLogout() {
    console.log('handling logout');
    domain.dispose();
    setDomain({ domain: null, projectData: null });
  }
  function handleClose() {
    console.log('handling close');

    const projData = projectData;
    projData.model.close();
    projData.activity.leave();
    projData.chatRoom.leave();

    closeAll();

    setProjectData({ projectData: null });
  }
  if (!domain) {
    //---->Takes in a url --->
    return <Login domainUrl={domainUrl} onLogin={handleLogin} />;
    //<------Spits out a domain "onLogin"
  } else if (!projectData) {
    return (
      //---->Takes in a modelService  --->
      <ProjectDialog
        collectionId={'projects'}
        onOpen={handleOpenProject}
        modelService={domain.models()}
        onLogout={handleLogout}
        //<------Creates & opens a new model or opens an existing model and then calls
        //onOpen()
      />
    );
  } else {
    return (
      <Home
        rtModel={projectData.model}
        chatRoom={projectData.chatRoom}
        domain={domain}
        activity={projectData.activity}
        user={projectData.user}
        onLogout={handleLogout}
        onClose={handleClose}
      />
    );
  }
}

export default App;
