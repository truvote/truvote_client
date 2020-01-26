import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import Home from './Home';
import Login from './Login';
import Navbar from './Navbar';

import { fetchUsers } from '../redux/users';
// import { fetchStories } from '../redux/stories';
import { fetchCurrentUser } from '../redux/auth';

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
			    <Route path="/login" component={Login} />
			    {/* <Route exact path="/users" component={UserList} />
			    <Route path="/users/:id" component={UserDetail} />
			    <Route exact path="/stories" component={StoryList} />
			    <Route path="/stories/:id" component={StoryDetail} /> */}
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
    // dispatch(fetchStories());
    dispatch(fetchCurrentUser());
  }
});

export default connect(mapState, mapDispatch)(Root);