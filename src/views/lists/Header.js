import React, { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Breadcrumbs,
  Button,
  Grid,
  Link,
  Menu,
  MenuItem,
  SvgIcon,
  Typography,
  makeStyles
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Skeleton from '@material-ui/lab/Skeleton';
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import {createDevice} from "../../actions/devicesActions";

const useStyles = makeStyles((theme) => ({
  root: {},
  actionIcon: {
    marginRight: theme.spacing(1)
  }
}));

function Header({name, className, ...rest }) {
  const classes = useStyles();
  const actionRef = useRef(null);
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <Grid
      container
      spacing={3}
      justify="space-between"
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Grid item>
        {name ?
            <Typography
          variant="h6"
          color="textPrimary"
        >
          Chaves Cadastradas
        </Typography>
            :  <Skeleton animation="wave" height={10} width="90%" />}
      </Grid>
      <Grid item>
        <ResponsiveDialog />
      </Grid>
    </Grid>
  );
}
function ResponsiveDialog() {
  const [open, setOpen] = React.useState(false);
  const [name, setName ] = React.useState('');

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
      alert(response.message);
    }else{
      alert('Por favor preencha o campo de nome do APP')
    }
  }

  return (
      <div>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Criar  Nova Chave
        </Button>
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
Header.propTypes = {
  className: PropTypes.string
};

export default Header;
