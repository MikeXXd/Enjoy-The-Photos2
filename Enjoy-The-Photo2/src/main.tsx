import React from 'react'
import ReactDOM from 'react-dom/client'
import {App} from './App.tsx'
import "./styles.css";
import { PhotosProvider } from './context/Photos.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <PhotosProvider> 
    <React.StrictMode>
    <App />
  </React.StrictMode>
  </PhotosProvider>
)
