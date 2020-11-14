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
import {registerUser} from "../../actions/accountActions";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1),
        padding: '200'
    },
    formControl: {
        minWidth: '100%',
    },
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
                role :'',
            }}
            validationSchema={Yup.object().shape({
                name: Yup.string().max(255).required('Nome é obrigatorio'),
                c_password: Yup.string().max(255).required('Confirmação de senha é obrigatorio'),
                email: Yup.string().email('Informe um e-mail valido').max(255).required('E -mail  é obrigatorio'),
                password: Yup.string().min(7).max(255).required('A senha é obrigatorio'),
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
                        <select
                            margin="normal"
                            value={values.role}
                            label="Nivel de Acesso"
                            variant="outlined"
                        >
                            <option value={2} label="Usuario"/>
                            <option value={1} label="Administrador"/>
                        </select>
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
