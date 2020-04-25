import * as React from 'react';
import App from './components/App.jsx';
import { render } from 'react-dom';
import './scss/styles.scss';
import '@babel/polyfill';

// By getting the <div> element in index.html by the id 'app', 
  // React can render it's elements to the DOM
  console.log('what the fuck top level')
render(<App />, document.getElementById('app'))