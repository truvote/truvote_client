import React from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';

import { logout } from '../redux/auth';

/* -----------------    COMPONENT     ------------------ */

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.renderLoginSignup = this.renderLoginSignup.bind(this);
    this.renderLogout = this.renderLogout.bind(this);
  }

  render() {
    return (
      <nav>
        <div>
          <div>
            <button
              type="button"
              data-toggle="collapse"
              data-target=".navbar-collapse">
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <NavLink className="navbar-brand" to="/"><img src="/images/logo.png" /></NavLink>
          </div>
          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
              <li>
                <NavLink to="/users" activeClassName="active">users</NavLink>
              </li>
              <li>
                <NavLink to="/bills" activeClassName="active">bills</NavLink>
              </li>
            </ul>
            { this.props.currentUser.id ? this.renderLogout() : this.renderLoginSignup() }
          </div>
        </div>
      </nav>
    );
  }

  renderLoginSignup() {
    return (
      <ul>
        <li>
         <NavLink to="/signup" activeClassName="active">signup</NavLink>
        </li>
        <li>
          <NavLink to="/login" activeClassName="active">login</NavLink>
        </li>
      </ul>
    );
  }

  renderLogout() {
    const name = this.props.currentUser.name || this.props.currentUser.email;
    return (
      <ul>
        <li>
        <button
          onClick={this.props.logout}>
          logout {name}
        </button>
        </li>
      </ul>
    );
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({currentUser}) => ({ currentUser });

const mapDispatch = (dispatch, ownProps) => ({
  logout: () => {
    dispatch(logout(ownProps.history));
  }
});

export default withRouter(connect(mapState, mapDispatch)(Navbar));
