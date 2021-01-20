import React from 'react';

import MonacoEditor from 'react-monaco-editor';
// import MonacoConvergenceAdapter from './../CollabWorkspace/monaco_adapter';
// import Convergence from '@convergence/convergence';
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
  function editorDidMount(monaco, editor) {
    convergenceConnect(monaco, editor);
  }
  return (
    <MonacoEditor
      height="400"
      language="javascript"
      value="//Hello world"
      options={options}
      editorDidMount={editorDidMount}
      theme="vs-dark"
    />
  );
}

export default CodeEditor;
