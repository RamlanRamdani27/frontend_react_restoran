import React from 'react';
import Footer from './Footer';
import Main from './Main';
import Nav from './Nav';
import Side from './Side';

import { Redirect } from 'react-router-dom';

const Back = () => {
  console.log(sessionStorage.getItem('token'));

  if (
    sessionStorage.getItem('token') === 'undefined' ||
    sessionStorage.getItem('token') === null
  ) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      <div className="row">
        <div className="col-12">
          <Nav />
        </div>
      </div>
      <div className="row">
        <div className="col-4">
          <Side />
        </div>
        <div className="col-8">
          <Main />
        </div>
      </div>
      <div className="row">
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Back;
