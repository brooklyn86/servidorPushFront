import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormHelperText,
  Grid,
  Switch,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {}
}));

function GeneralSettings({ user, className, ...rest }) {
  const classes = useStyles();


  return (
    <Formik
      enableReinitialize
      initialValues={{
        email: user.email,
        firstName: user.name,
        password: '',
        c_password: '',
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email('Must be a valid email').max(255).required('O e-mail é obrigatorio'),
        firstName: Yup.string().max(255).required('O nome é obrigatorio'),
      })}
      onSubmit={async (values, {
        resetForm,
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        try {
         // await dispatch(updateProfile(values));
          resetForm();
          setStatus({ success: true });
        //  enqueueSnackbar('Profile updated', {
           //variant: 'success'
         // });
        } catch (error) {
          setStatus({ success: false });
          setErrors({ submit: error.message });
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values
      }) => (
        <form onSubmit={handleSubmit}>
          <Card
            className={clsx(classes.root, className)}
            {...rest}
          >
            <CardHeader title="Editar Perfil" />
            <Divider />
            <CardContent>
              <Grid
                container
                spacing={4}
              >
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    error={''}
                    fullWidth
                    helperText=''
                    label="Nome"
                    name="firstName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    type="firstName"
                    value={values.firstName}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    error={''}
                    fullWidth
                    helperText={''}
                    label="E-mail"
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    type="email"
                    value={values.email}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    error={''}
                    fullWidth
                    helperText={''}
                    label="Senha"
                    name="password"
                    type={'password'}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    error={''}
                    fullWidth
                    helperText={''}
                    label="Confirmar Senha"
                    name="c_password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    type="password"
                    value={values.c_password}
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                </Grid>
              </Grid>
              {errors.submit && (
                <Box mt={3}>
                  <FormHelperText error>
                    {errors.submit}
                  </FormHelperText>
                </Box>
              )}
            </CardContent>
            <Divider />
            <Box
              p={2}
              display="flex"
              justifyContent="flex-end"
            >
              <Button
                color="secondary"
                disabled={isSubmitting}
                type="submit"
                variant="contained"
              >
                Atualizar Perfil
              </Button>
            </Box>
          </Card>
        </form>
      )}
    </Formik>
  );
}

GeneralSettings.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object.isRequired
};

export default GeneralSettings;
