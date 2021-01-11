import React, { useState } from 'react';
import { closeAll } from './actions/actionCreators';
import Login from './forms/Login';
import ProjectDialog from './project/ProjectDialog';
import Home from './Home/Home';

function App({ domainUrl }) {
  const [domain, setDomain] = useState(null);
  const [projectData, setProjectData] = useState(null);

  function handleLogin(domain) {
    setDomain(domain);
  }

  function handleOpenProject(model) {
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
    domain.dispose();
    setDomain({ domain: null, projectData: null });
  }
  function handleClose() {
    const projData = projectData;
    projData.model.close();
    projData.activity.leave();
    projData.chatRoom.leave();

    closeAll();

    this.setState({ projectData: null });
  }
  if (!domain) {
    return <Login domainUrl={domainUrl} onLogin={handleLogin} />;
  } else if (!projectData) {
    return (
      <ProjectDialog
        collectionId={'projects'}
        onOpen={handleOpenProject}
        modelService={domain.models()}
        onLogout={handleLogout}
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
