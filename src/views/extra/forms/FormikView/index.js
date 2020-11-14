import React, {useEffect, useState} from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Breadcrumbs,
  Container,
  Grid,
  Link,
  Typography,
  makeStyles
} from '@material-ui/core';
import Chart from 'chart.js';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import Page from '../../../../components/Page/Page';
import BasicForm from './BasicForm';
import TableMessage from './table';
import LineChart from "../../charts/ApexChartsView/LineChart";
import {getDeviceData} from "../../../../actions/devicesActions";
import {useParams} from "react-router";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    margin: 10
  }
}));

function FormikView() {

  const {key} = useParams();
  const classes = useStyles();
  const [params, setParams] = useState([]);
  const [device, setDevice] = useState({});
  const [dados, setDados] = useState([]);
  useEffect(async () => {
    const response = await getDeviceData(key);
    if(response.error){

    }else{
      setDevice(response.devices);
      setDados(response.dados);

      setParams([{key:'key', value:response.devices.key}, {key:'secret', value:response.devices.secret}])
    }
  },[key]);
  return (
    <Page
      className={classes.root}
      title="Formik Form"
    >
          <Grid container>
            <Grid
                item
                xs={12}
                md={6}
                style={{padding:10}}

            >
              <LineChart device={device} dados={dados}/>

            </Grid>
            <Grid
                item
                xs={12}
                md={6}
                style={{padding:10}}

            >
              {dados ? dados.messages  && <TableMessage rows={dados.messages} /> : <h1>Carregando...</h1>}


            </Grid>
            <Grid
              item
              xs={12}
              md={12}
            >
              <BasicForm />

            </Grid>
          </Grid>
    </Page>
  );
}
export default FormikView;
