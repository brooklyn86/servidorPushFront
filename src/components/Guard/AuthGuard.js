import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

function AuthGuard({ children }) {
  const account = localStorage.getItem('token');

  if (!account) {
    return <Redirect to="/login" />;
  }
  return children;
}

AuthGuard.propTypes = {
  children: PropTypes.any
};

export default AuthGuard;
