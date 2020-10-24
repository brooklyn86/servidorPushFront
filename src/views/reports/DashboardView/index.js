import React, {useEffect, useState} from 'react';
import {
  Button,
  Container,
  Grid,
  makeStyles, Typography
} from '@material-ui/core';
import moment from 'moment';
import Page from '../../../components/Page/Page';
import Header from './Header';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import {getUserData} from "../../../actions/accountActions";
import 'moment/locale/pt-br';
import Skeleton from '@material-ui/lab/Skeleton';
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  container: {
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 64,
      paddingRight: 64
    }
  },
    rootCard: {
      minWidth: 275,
      margin:10
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
}));
// eslint-disable-next-line react-hooks/rules-of-hooks

function DashboardView() {
  const classes = useStyles();
  const [user, setUser] = useState([]);
  useEffect(async () => {
    const response = await getUserData();
    setUser(response.user)
  },[]);
  return (
    <Page
      className={classes.root}
      title="Dashboard"
    >
      <Container
        maxWidth={false}
        className={classes.container}
      >
        <Header name={user.name}/>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={3}
            sm={6}
            xs={12}
          >

            {
              user && user.devices  ?
                  user.devices.map((item) =>
                      <CardData dados={item}/>
                  )
                :
                  <>
                    <CardDataLoading/>
                    <CardDataLoading/>
                    <CardDataLoading/>
                  </>
            }
          </Grid>
          <Grid
            item
            lg={6}
            sm={6}
            xs={12}
          >
            <CardTutorial />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xs={12}
          >
            
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xs={12}
          >
            
          </Grid>
          <Grid
            item
            lg={3}
            xs={12}
          >
          
          </Grid>
          <Grid
            item
            lg={9}
            xs={12}
          >
          </Grid>
          <Grid
            item
            lg={5}
            xl={4}
            xs={12}
          >

          </Grid>
          <Grid
            item
            lg={7}
            xl={8}
            xs={12}
          >
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

function CardData(item) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  return (
      <Card className={classes.rootCard} variant="outlined">
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            <b>Informações de Acesso</b>
          </Typography>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            <b>KEY:</b> {item.dados.key}
          </Typography>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            <b>SECRET:</b> {item.dados.secret}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Criado cerca de {moment(item.dados.created_at).locale('pt-br').fromNow()}</Button>
          <Button size="small" color="primary">Enviar Notificação</Button>
        </CardActions>
      </Card>
  );
}
function CardDataLoading() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  return (
      <Card className={classes.rootCard} variant="outlined">
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />
          </Typography>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            <Skeleton animation="wave" height={10} width="70%" style={{ marginBottom: 6 }} />
          </Typography>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            <Skeleton animation="wave" height={10} width="70%" style={{ marginBottom: 6 }} />
          </Typography>
        </CardContent>
        <CardActions>
          <Skeleton animation="wave" height={10} width="60%" style={{ marginBottom: 6 }} />
        </CardActions>
      </Card>
  );
}
function CardTutorial() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  return (
      <Card className={classes.rootCard} variant="outlined">
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            <b>Recebendo as notificações</b>
          </Typography>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Para receber as notificações push deverá ser instalada a biblioteca <code> <a herf={"https://socket.io/"} target="_black"><b>socket.io</b></a></code> ou outra plataforma de websocket
          </Typography>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            os parametros informados para nossa api serão sua <b>key</b> e sua <b>secret</b>
          </Typography>

          <Typography className={classes.title} color="textSecondary" gutterBottom>
          Exemplo:
          </Typography>
        </CardContent>
        <CardActions>

        </CardActions>
      </Card>
  );
}
export default DashboardView;
