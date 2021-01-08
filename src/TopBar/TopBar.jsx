import React, { useState } from 'react';
function TopBar() {
  const [user, setUser] = useState({
    name: '',
    room: '',
  });

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(user);
          setUser({ ...user, name: '', room: '' });
        }}
      >
        <input
          type="text"
          placeholder="name"
          value={user.name}
          onChange={(e) => {
            setUser({ ...user, name: e.target.value });
          }}
        />
        <input
          type="text"
          placeholder="room"
          value={user.room}
          onChange={(e) => {
            setUser({ ...user, room: e.target.value });
          }}
        />
        <button type="submit">join</button>
      </form>
    </div>
  );
}

export default TopBar;
