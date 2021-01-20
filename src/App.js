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
  function tryAutoLogin() {
    // console.log('trying auto login');
  }
  function handleLogin(domain) {
    /*
     *The ConvergenceDomain is the main object that serves as the entry point of the Convergence API after a
     * user is authenticated. The domain is returned by the various connection methods in the Convergence API.
     *  When an instance of ConvergenceDomain is returned by one of the connect methods,
     * the domain will be authenticated, connected, and ready to be used.
     */
    setDomain(domain);
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
    /*
     * Disposing the domain will disconnected
     *it from the server and release all resources associated with the domain.
     * ////////////////////////
     *  If you do not dispose of the domain, the connection will be maintained.
     * This means that the user will still be counted when calculating the number
     * of concurrent users your domain is using. You should dispose
     * the domain when you are done with it to avoid maintaining unnecessary connections.
     */
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
    /*
     *If user is not authenticated/logged in, "no domain",
     *show the login Form
     */

    return <Login domainUrl={domainUrl} onLogin={handleLogin} />;
  } else if (!projectData) {
    /*
     *If the user has been authenticated ie "a domain exists" but no model is open,
     * Show the project dialog that allows to open an existing model
     * or create a new one.
     */
    return (
      <ProjectDialog
        collectionId={'projects'}
        onOpen={handleOpenProject}
        modelService={domain.models()}
        onLogout={handleLogout}
      />
    );
  } else {
    /*
     *When all the data has been set show the main page
     */
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
