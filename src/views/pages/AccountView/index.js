import React, { useState } from 'react';
import {
  Box,
  Container,
  Divider,
  Tab,
  Tabs,
  makeStyles
} from '@material-ui/core';
import Page from '../../../components/Page/Page';
import General from './General';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

function AccountView() {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState('general');

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  return (
    <Page
      className={classes.root}
      title="Perfil Usuario"
    >
      <Container maxWidth="lg">
        <Box mt={3}>

        </Box>
        <Divider />
        <Box mt={3}>
           <General />
        </Box>
      </Container>
    </Page>
  );
}

export default AccountView;
