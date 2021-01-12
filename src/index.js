import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

if (typeof CodeEditorConfig !== 'undefined') {
  /*"CodeEditorConfig" configured in the code-editor-config.js
   *file in the public Folder
   */
  const domainUrl = window.CodeEditorConfig.CONVERGENCE_URL;
  ReactDOM.render(
    <React.StrictMode>
      <App domainUrl={domainUrl} />
    </React.StrictMode>,
    document.getElementById('root')
  );
} else {
  throw new Error('Cannot find configuration for the code editor');
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
