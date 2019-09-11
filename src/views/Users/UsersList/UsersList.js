import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';

import axios from 'utils/axios';
import { Page, SearchBar } from 'components';
import { Header, Results } from './components';

const styles = theme => ({
  root: {
    padding: theme.spacing(3)
  },
  results: {
    marginTop: theme.spacing(3)
  }
});
class UsersList extends Component {
  state = {
    users : null
  };

  componentDidMount() {
    this.fetchResults()
  }

  fetchResults(){
    axios.get('/api/management/customers').then(response => {
      this.setState({users: response.data.customers});
    });
  }
  handleSearch(){

  }

  render() {
    const { classes } = this.props;
    return (
      <Page
        className={classes.root}
        title="Customer Management List"
      >
        <Header />
        <SearchBar
          // onFilter={handleFilter}
          onSearch={this.handleSearch}
        />
        {this.state.users && (
          <Results
            className={classes.results}
            customers={this.state.users}
          />
        )}
      </Page>
    );
  }
}

export default withStyles(styles)(UsersList);
