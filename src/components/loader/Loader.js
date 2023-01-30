import React from 'react';
import { observer } from 'mobx-react';
import './Loader.scss';

const Loader = ({ visible = false }) => {
  if (!visible) {
    return null;
  }

  return (
    <div className="loader">
      <div className="loader-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default observer(Loader);
