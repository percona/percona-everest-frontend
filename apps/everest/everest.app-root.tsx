import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { EverestApp } from './app';

ReactDOM.render((
  <BrowserRouter>
    <EverestApp />
  </BrowserRouter>
), document.getElementById('root'));

