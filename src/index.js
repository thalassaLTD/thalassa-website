import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import theme from './theme';
import './material.scss'
import { createRoot } from 'react-dom/client';

// import * as serviceWorker from './serviceWorker';
const container = document.getElementById('root');
const root = createRoot(container)
root.render(
  <React.StrictMode>
    {/* <ThemeProvider theme={theme}> */}
    <App />
  {/* </ThemeProvider> */}
  </React.StrictMode>);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
