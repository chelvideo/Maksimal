import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clickDay from '../store/actionsCreator/clickDay';
import '../styles/Loader.scss';

function Loader(props) {
  return (
    <>
      <div className="loader-background" />
      <div className="loader">
        <div className="lds-ring">
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>
    </>
  );
}

export default Loader;
