import React, { useState } from 'react';

import MonacoEditor from 'react-monaco-editor';
import MonacoConvergenceAdapter from './../CollabWorkspace/monaco_adapter';
import Convergence from '@convergence/convergence';
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function convergenceConnect(monaco, editor) {}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const options = {
  selectOnLineNumbers: true,
  roundedSelection: false,
  readOnly: false,
  cursorStyle: 'line',
  automaticLayout: false,
};
function CodeEditor() {
  const [theme, setTheme] = useState('vs-dark');
  function toggleTheme() {
    return theme === 'vs-light' ? setTheme('vs-dark') : setTheme('vs-light');
  }

  function editorDidMount(monaco, editor) {
    convergenceConnect(monaco, editor);
  }
  return (
    <div>
      <div>
        <button onClick={toggleTheme} type="button">
          toggle theme
        </button>
      </div>
      <hr />
      <MonacoEditor
        height="400"
        language="javascript"
        value="//Hello world"
        options={options}
        editorDidMount={editorDidMount}
        theme={theme}
      />
    </div>
  );
}

export default CodeEditor;
