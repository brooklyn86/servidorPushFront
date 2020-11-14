import React from 'react';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Checkbox,
  FormHelperText,
  TextField,
  Typography,
  Link,
  makeStyles
} from '@material-ui/core';
import {registerUser} from "../../../actions/accountActions";
// import { register } from 'src/actions/accountActions';

const useStyles = makeStyles(() => ({
  root: {}
}));

function RegisterForm({ className, onSubmitSuccess, ...rest }) {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
        c_password :'',
        policy: false
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().max(255).required('Nome é obrigatorio'),
        c_password: Yup.string().max(255).required('Confirmação de senha é obrigatorio'),
        email: Yup.string().email('Informe um e-mail valido').max(255).required('E -mail  é obrigatorio'),
        password: Yup.string().min(7).max(255).required('A senha é obrigatorio'),
        policy: Yup.boolean().oneOf([true], 'O Termo  é obrigatorio')
      })}
      onSubmit={async (values, {
        setErrors,
        setStatus,
        setSubmitting
      }) => {
         try {
          const response = await registerUser(values);
          onSubmitSuccess();
         } catch (error) {
           setStatus({ success: false });
           setErrors({ submit: error.message });
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
        <form
          className={clsx(classes.root, className)}
          onSubmit={handleSubmit}
          {...rest}
        >
          <TextField
            error={Boolean(touched.name && errors.name)}
            fullWidth
            helperText={touched.name && errors.name}
            label="Nome"
            margin="normal"
            name="name"
            onBlur={handleBlur}
            onChange={handleChange}
            type="firstName"
            value={values.name}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.email && errors.email)}
            fullWidth
            helperText={touched.email && errors.email}
            label="E-mail"
            margin="normal"
            name="email"
            onBlur={handleBlur}
            onChange={handleChange}
            type="email"
            value={values.email}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.password && errors.password)}
            fullWidth
            helperText={touched.password && errors.password}
            label="Senha"
            margin="normal"
            name="password"
            onBlur={handleBlur}
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />
          <TextField
                error={Boolean(touched.c_password && errors.c_password)}
                fullWidth
                helperText={touched.c_password && errors.c_password}
                label="Confirmar Senha"
                margin="normal"
                name="c_password"
                onBlur={handleBlur}
                onChange={handleChange}
                type="password"
                value={values.c_password}
                variant="outlined"
            />
          <Box
            alignItems="center"
            display="flex"
            mt={2}
            ml={-1}
          >
            <Checkbox
              checked={values.policy}
              name="policy"
              onChange={handleChange}
            />
            <Typography
              variant="body2"
              color="textSecondary"
            >
              I have read the
              {' '}
              <Link
                component="a"
                href="#"
                color="secondary"
              >
                Terms and Conditions
              </Link>
            </Typography>
          </Box>
          {Boolean(touched.policy && errors.policy) && (
            <FormHelperText error>
              {errors.policy}
            </FormHelperText>
          )}
          <Box mt={2}>
            <Button
              color="secondary"
              disabled={isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Cadastrar
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
}

RegisterForm.propTypes = {
  className: PropTypes.string,
  onSubmitSuccess: PropTypes.func
};

RegisterForm.default = {
  onSubmitSuccess: () => {}
};

export default RegisterForm;
