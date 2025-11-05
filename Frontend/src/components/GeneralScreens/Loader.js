import React from 'react';
import '../../Css/Loader.css';

const Loader = () => (
  <div className="mask">
    <svg className="simple-spinner" viewBox="0 0 50 50">
      <circle
        className="simple-spinner-path"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        strokeWidth="5"
      />
    </svg>
  </div>
);

export default Loader;