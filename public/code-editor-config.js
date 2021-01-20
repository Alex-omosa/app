const CodeEditorConfig = {
  CONVERGENCE_URL:
    'http://104.237.135.27:8000/api/realtime/convergence/default',
  ANONYMOUS_AUTH: true,
};

window.CodeEditorConfig = CodeEditorConfig;
// http://104.237.135.27:8000/convergence/default

//Docker command to run the convergence server
// docker run -t -d -p 8000:80 -v /api/realtime --name convergence convergencelabs/convergence-omnibus
