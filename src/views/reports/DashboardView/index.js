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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {createDevice} from "../../../actions/devicesActions";
import AlertMessage from '../../../components/Alert';
import { Link, useHistory } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
const scriptExample ='\n<script src="https://www.gstatic.com/firebasejs/8.2.3/firebase-app.js"></script>\n'+
    '<script src="https://code.jquery.com/jquery-1.11.1.js"></script>\n'+
    '<script src="https://www.gstatic.com/firebasejs/8.2.3/firebase-messaging.js"></script>\n'+
    '\n'+
    '<script>\n'+
      '   var key = "3bc3af7ac05ff884eeefd1b980858a5b";\n'+
      '   var secret = "a07fb80725666f93fc462c9f85888895";\n'+
      'if ("serviceWorker" in navigator) {\n'+
      '  navigator.serviceWorker.register("./firebase-messaging-sw.js")\n'+
      '    .then(function(registration) {\n'+
      '      console.log("Registration successful, scope is:", registration.scope);\n'+
      '    }).catch(function(err) {\n'+
      '     console.log("Service worker registration failed, error:", err);\n'+
      '    });\n'+
      '}\n'+
      '</script>\n'+
    '<script src="http://localhost:3000/service-push-notification.js"></script>\n';

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
                  user.devices.length > 0 ?
                    user.devices.map((item, key) =>
                    key < 4 &&
                      <CardData key={key} dados={item}/>
                    )
                      : <CardDataLoading message={"Você não tem nenhum APP criado!"}/>
                :
                  <>
                    <CardDataLoading message={null}/>
                    <CardDataLoading message={null}/>
                    <CardDataLoading message={null}/>
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
            <b>Nome do APP:</b> {item.dados.name}
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
          <Link to={`/app/key/${item.dados.key}`}><Button size="small" color="primary">Enviar Notificação</Button></Link>
        </CardActions>
      </Card>
  );
}

function ResponsiveDialog() {
  const [open, setOpen] = React.useState(false);
  const [name, setName ] = React.useState('');
  const [alertMessage, setAlertMessage ] = React.useState(false);
  const [message, setMessage ] = React.useState('');
  const [alertType, setAlertType ] = React.useState('error');
  const [openAlert, setOpenAlert ] = React.useState(false);


  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function handleCreateApp() {
    if(name !== ''){
         const response = await createDevice(name);
      setName('');
      setOpen(false);
      setMessage(response.message);
      setAlertMessage(true);
      if(response.error){
        setAlertType('success')
      }else{
        setAlertType('error')

      }

    }else{
      alert('Por favor preencha o campo de nome do APP')
    }
  }

  return (
      <div>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Criar Novo APP
        </Button>
        {alertMessage && <AlertMessage open={true} message={message} type={alertType} /> }
        <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle color="textSecondary">
            Deseja criar um novo APP?
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Para criar um novo APP basta dá um nome a ele o resto é com a gente!
            </DialogContentText>
            <DialogContentText>
              <TextField id="outlined-basic" label="Nome do APP" style={{width:"100%"}} value={name} onChange={(e) => setName(e.target.value)} variant="outlined" />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleCreateApp} color="primary" autoFocus>
              Criar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
  );
}
function CardDataLoading({message}) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  return (
      <Card className={classes.rootCard} variant="outlined">
        {!message ?
            (<>
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
        </>)
            :
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                {message}
              </Typography>
            </CardContent>

        }

        <CardActions>
          { !message ?
              <Skeleton animation="wave" height={10} width="60%" style={{ marginBottom: 6 }} /> :
              <ResponsiveDialog />}
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


          <pre> {scriptExample} </pre >

        </CardContent>
        <CardActions>

        </CardActions>
      </Card>
  );
}
export default DashboardView;
