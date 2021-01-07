import React, { useState } from 'react';

import MonacoEditor from 'react-monaco-editor';
import MonacoConvergenceAdapter from './../CollabWorkspace/monaco_adapter';
import Convergence from '@convergence/convergence';
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var DOMAIN_URL = 'http://104.237.135.27:8000/api/realtime/convergence/default';

async function convergenceConnect(monaco, editor) {
  const monacoModel = monaco.getModel();
  const editorValue = monacoModel.getValue();
  const domain = await Convergence.connect(DOMAIN_URL, 'Alex-omosa', 'Alex');
  // Model Service: Provides services to store, retrieve, and edit shared data models.
  const modelService = domain.models();
  const model = await modelService.openAutoCreate({
    collection: 'employee',
    id: 123,
    data: {
      text: editorValue,
    },
  });

  // const root = model.root();

  const text = model.elementAt('text');

  const adapter = new MonacoConvergenceAdapter(monaco, text);
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
    theme === 'vs-light' ? setTheme('vs-dark') : setTheme('vs-light');
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
