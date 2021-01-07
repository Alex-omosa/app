import React, { useEffect, useState, useMemo } from 'react';
import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';
import { MonacoBinding } from 'y-monaco';
import Editor from '@monaco-editor/react';
import { themeContext } from './themeContex';
import TopBar from './TopBar';

function EditorComponent() {
  const [theme, setTheme] = useState('vs-dark');
  const themeProviderValue = useMemo(() => ({ theme, setTheme }), [
    theme,
    setTheme,
  ]);

  function handleComponentDidMount(_, editor) {
    const ydoc = new Y.Doc();
    const provider = new WebrtcProvider(
      `${
        window.location.protocol === 'http:' ? 'ws:' : 'wss:'
      }//localhost:1234`,
      'monaco',
      ydoc
    );
    const type = ydoc.getText('monaco');

    const monacoBinding = new MonacoBinding(
      type,
      editor.getModel(),
      new Set([editor]),
      provider.awareness
    );
  }

  return (
    <themeContext.Provider value={themeProviderValue}>
      <TopBar />
      <Editor
        height="90vh"
        language="javascript"
        theme="vs-dark"
        value={'// write your code here'}
        editorDidMount={() => {
          console.log('handleComponentDidMount');
        }}
      />
    </themeContext.Provider>
  );
}

export default EditorComponent;
