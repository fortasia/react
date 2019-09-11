import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Divider,
  TextField,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  colors, LinearProgress
} from '@material-ui/core';

import SuccessSnackbar from '../SuccessSnackbar';
import * as actions from '../../../../../../../actions';
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {},
  saveButton: {
    color: theme.palette.white,
    backgroundColor: colors.green[600],
    '&:hover': {
      backgroundColor: colors.green[900]
    }
  }
}));

const GeneralSettings = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [values, setValues] = useState({

  });

  const handleChange = event => {
    event.persist();

    setValues({
      ...values,
      [event.target.name]:
        event.target.type === 'checkbox'
          ? event.target.checked
          : event.target.value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    let data = {
      phoneNumber: values.phoneNumber,
      email: values.email,
      password: values.password,
      firstName: values.firstName,
      lastName: values.lastName,
      role: values.role
    };
    props.onCreateUser(data);
    setOpenSnackbar(true);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };
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
        className={classes.saveButton}
        type="submit"
        variant="contained"
      >
        Create User
      </Button>
    )
  }
  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form onSubmit={handleSubmit}>
        {loading}
        <CardHeader title="Create User" />
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
                fullWidth
                helperText="Please specify the first name"
                label="First name"
                name="firstName"
                onChange={handleChange}
                required
                disabled={props.loading}
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
                fullWidth
                label="Last name"
                name="lastName"
                onChange={handleChange}
                required
                disabled={props.loading}
                value={values.lastName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={handleChange}
                required
                type="email"
                disabled={props.loading}
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
                fullWidth
                label="Phone Number"
                name="phoneNumber"
                onChange={handleChange}
                required
                type="text"
                disabled={props.loading}
                value={values.phoneNumber}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Password"
                name="password"
                onChange={handleChange}
                required
                type="password"
                disabled={props.loading}
                value={values.password}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                onChange={handleChange}
                required
                type="password"
                disabled={props.loading}
                value={values.confirmPassword}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <FormControl component="fieldset">
                <FormLabel component="legend">Select User Type</FormLabel>
                <RadioGroup aria-label="role" name="role" value={values.role} onChange={handleChange} row>
                  <FormControlLabel
                    value="buyer"
                    control={<Radio color="primary" required />}
                    label="Buyer"
                    disabled={props.loading}
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="seller"
                    control={<Radio color="primary" required />}
                    label="Seller"
                    disabled={props.loading}
                    labelPlacement="end"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>

          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          {button}
        </CardActions>
      </form>
      <SuccessSnackbar
        onClose={handleSnackbarClose}
        open={openSnackbar}
      />
    </Card>
  );
};

GeneralSettings.propTypes = {
  className: PropTypes.string
};

const mapStateToProps = state => {
  return {
    loading: state.users.loading,
    error: state.users.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCreateUser: ( data ) => dispatch( actions.createUser( data) )
  };
};
export default connect( mapStateToProps, mapDispatchToProps )( GeneralSettings );


