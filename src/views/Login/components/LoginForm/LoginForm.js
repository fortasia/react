/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import validate from 'validate.js';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { useDispatch, connect } from 'react-redux';
import * as actions from '../../../../actions/index';
import { makeStyles } from '@material-ui/styles';
import { Button, TextField, LinearProgress, Snackbar, IconButton } from '@material-ui/core';
import Alert from 'components/Alert'

import useRouter from 'utils/useRouter';

const schema = {
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' }
  }
};

const useStyles = makeStyles(theme => ({
  root: {},
  fields: {
    margin: theme.spacing(-1),
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      flexGrow: 1,
      margin: theme.spacing(1)
    }
  },
  submitButton: {
    marginTop: theme.spacing(2),
    width: '100%'
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
}));

const LoginForm = props => {
  const { className, variant, ...rest } = props;
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });
  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  const handleChange = event => {
    event.persist();
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    props.onLogin(formState.values.email, formState.values.password);
  };

  const onCloseAlert = (event)=>{
    console.log(event)
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  let loading = null;
  let button = null;
  if(props.loading){
    loading = (
      <div>
        <LinearProgress />
        <br />
      </div>
    );
  }else{
    button = (
      <Button
        className={classes.submitButton}
        color="secondary"
        disabled={!formState.isValid}
        size="large"
        type="submit"
        variant="contained"
      >
        Sign in
      </Button>
    );
  }
  let message;
  if(!!props.error){
    message = (
      <Alert variant="error" message={props.error} />
    )
  }
  return (
    <div>
      {message}
      <form
        {...rest}
        className={clsx(classes.root, className)}
        onSubmit={handleSubmit}
      >
        {loading}
        <div className={classes.fields}>
          <TextField
            error={hasError('email')}
            autoComplete="off"
            fullWidth
            helperText={hasError('email') ? formState.errors.email[0] : null}
            label="Email Address"
            name="email"
            onChange={handleChange}
            value={formState.values.email || ''}
            variant="outlined"
            disabled={props.loading}
          />
          <TextField
            error={hasError('password')}
            fullWidth
            autoComplete="off"
            helperText={
              hasError('password') ? formState.errors.password[0] : null
            }
            label="Password"
            name="password"
            onChange={handleChange}
            type="password"
            value={formState.values.password || ''}
            variant="outlined"
            disabled={props.loading}
          />
        </div>
        {button}
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  className: PropTypes.string
};

const mapStateToProps = state => {
  return {
    loading: state.session.loading,
    error: state.session.error,
    isAuthenticated: state.session.loggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogin: ( email, password ) => dispatch( actions.login( email, password) )
  };
};
export default connect( mapStateToProps, mapDispatchToProps )( LoginForm );
