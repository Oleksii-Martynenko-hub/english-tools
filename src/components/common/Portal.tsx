import React from 'react';
import ReactDOM from 'react-dom';

const Portal: React.FC = ({ children }) => (
  ReactDOM.createPortal(children, document.getElementById('root')!)
);

export default Portal;
