import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '@fontsource/roboto'; // Defaults to weight 400
import '@fontsource/roboto/400.css'; // Regular
import '@fontsource/roboto/500.css'; // Medium
import '@fontsource/roboto/700.css'; // Bold

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( 
    <App /> 
);

reportWebVitals();
