import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../styles/Loader.css';

function Loader(props) {

  return (
    <div className="lds-ring">
        <div></div><div></div><div></div><div></div>
    </div>
  );
}

export default Loader;
