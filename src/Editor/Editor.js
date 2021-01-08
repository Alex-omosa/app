import React, { useState } from 'react';

import MonacoEditor from 'react-monaco-editor';
import MonacoConvergenceAdapter from './../CollabWorkspace/monaco_adapter';
import Convergence from '@convergence/convergence';
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var DOMAIN_URL = 'http://104.237.135.27:8000/api/realtime/convergence/default';
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
const user = getRandomInt(20);
async function convergenceConnect(monaco, editor) {
  const monacoModel = monaco.getModel();
  const editorValue = monacoModel.getValue();

  const domain = await Convergence.connectAnonymously(DOMAIN_URL, user);
  // Model Service: Provides services to store, retrieve, and edit shared data models.
  const modelService = domain.models();
  const realTimeModel = await modelService.openAutoCreate({
    collection: 'example-monaco',
    id: 'convergenceExampleId',
    data: {
      text: editorValue,
    },
  });

  const realTimeString = realTimeModel.elementAt('text');

  //Binding to the monaco editor
  const adapter = new MonacoConvergenceAdapter(monaco, realTimeString);
  adapter.bind();
}

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
const EditorComponent = () => (
  <div>
    <CodeEditor />
  </div>
);
export default EditorComponent;
