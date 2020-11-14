import React, {useEffect, useState} from 'react';
//import { useSelector } from 'react-redux';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Grid, makeStyles } from '@material-ui/core';
import ProfileDetails from './ProfileDetails';
import GeneralSettings from './GeneralSettings';
import {getUserData} from "../../../../actions/accountActions";

const useStyles = makeStyles(() => ({
  root: {}
}));

function General({ className, ...rest }) {
  const classes = useStyles();
  const [user, setUser] = useState([]);
  useEffect(async () => {
    const response = await getUserData();
    setUser(response.user)
  },[]);
  return (
    <Grid
      className={clsx(classes.root, className)}
      container
      spacing={3}
      {...rest}
    >
      <Grid
        item
        lg={8}
        md={6}
        xl={9}
        xs={12}
      >
        {user &&
          <GeneralSettings user={user} />
        }
      </Grid>
    </Grid>
  );
}

General.propTypes = {
  className: PropTypes.string
};

export default General;
