import React, { Fragment, Suspense } from 'react';
import { renderRoutes } from 'react-router-config';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { LinearProgress } from '@material-ui/core';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

const useStyles = makeStyles(theme => ({
  content: {
    height: '100%',
    paddingTop: 56,
    [theme.breakpoints.up('sm')]: {
      paddingTop: 64
    }
  }
}));

const Auth = props => {
  const { route } = props;
  const classes = useStyles();
  let sessionRedirect = null;
  if ( props.isAuthenticated) {
    if(!!props.auth.token ){
      sessionRedirect = <Redirect to={props.dashboardURL} />
    }
  }

  return (
    <Fragment>
      {sessionRedirect}
      <main className={classes.content}>
        <Suspense fallback={<LinearProgress />}>
          {renderRoutes(route.routes)}
        </Suspense>
      </main>
    </Fragment>
  );
};

Auth.propTypes = {
  route: PropTypes.object
};


const mapStateToProps = state => {
  return {
    isAuthenticated: state.session.loggedIn,
    auth: state.session.auth,
    dashboardURL: state.session.dashboardURL
  };
};

export default connect( mapStateToProps )( Auth );
