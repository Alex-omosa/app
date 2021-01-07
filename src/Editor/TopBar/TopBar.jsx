import React, { useState, useContext } from 'react';
import { themeContext } from './../themeContex';
function TopBar() {
  const [value, setValue] = useState('monaco');
  const { theme, setTheme } = useContext(themeContext);

  return (
    <div>
      <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        change theme
      </button>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(value);
          setValue('');
        }}
      >
        <input type="text" value={value} onChange={(e) => {}} />
        <button type="submit">join</button>
      </form>
    </div>
  );
}

export default TopBar;
