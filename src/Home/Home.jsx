import React from 'react';
import Editor from './../Editor';
function Home({
  rtModel,
  chatRoom,
  domain,
  activity,
  user,
  onLogout,
  onClose,
}) {
  console.log(user);
  return (
    <div>
      <Editor />
    </div>
  );
}

export default Home;
