import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

function GuestGuard({ children }) {
  const account = localStorage.getItem('token');

  if (account) {
    return <Redirect to="/login" />;
  }

  return children;
}

GuestGuard.propTypes = {
  children: PropTypes.any
};

export default GuestGuard;
