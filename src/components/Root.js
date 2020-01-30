import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Navbar from './Navbar';
import BillDetail from './BillDetail'

import { fetchUsers } from '../redux/users';
import { fetchBill } from '../redux/bills';
// import { fetchCurrentUser } from '../redux/auth';

/* -----------------    COMPONENT     ------------------ */

class Root extends Component {
	componentDidMount() {
		this.props.fetchInitialData();
	}
	render () {
		return (
	    <Router>
				<div id="main" className="container-fluid">
			    <Navbar />
			    <Route exact path="/" component={Home} />
			    {/* <Route path="/login" component={Login} />
				<Route path="/signup" component={Signup} />
			    <Route exact path="/users" component={UserList} />
			    <Route path="/users/:id" component={UserDetail} />
			    <Route exact path="/bills" component={BillList} /> */}
			    <Route path="/bill/:id" component={BillDetail} />
			  </div>
		  </Router>
		)
	}
} 

/* -----------------    CONTAINER     ------------------ */

const mapState = null;

const mapDispatch = dispatch => ({
  fetchInitialData: () => {
    dispatch(fetchUsers());
    // dispatch(fetchBillss());
    // dispatch(fetchCurrentUser());
  }
});

export default connect(mapState, mapDispatch)(Root);