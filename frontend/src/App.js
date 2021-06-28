
import './App.css';
import React from 'react';
import {useDropzone} from 'react-dropzone';



function App() {

  const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
  
  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <div>
<section className="container">
      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <p>Click to select files</p>
      </div>
      <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside>
</section>
<button >
  Submit
</button>
</div>
    
  );
}

export default App;
