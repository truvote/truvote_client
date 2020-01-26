import React from 'react';
import { connect } from 'react-redux';

import { login as loginFromReducer} from '../redux/auth';

/* -----------------    COMPONENT     ------------------ */

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.onLoginSubmit = this.onLoginSubmit.bind(this);
  }

  render() {
    const { message } = this.props;
    return (
      <div className="signin-container">
        <div className="buffer local">
          <form onSubmit={this.onLoginSubmit}>
            <div className="form-group">
              <label>email</label>
              <input
                name="email"
                type="email"
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>password</label>
              <input
                name="password"
                type="password"
                className="form-control"
                required
              />
            </div>
            <button type="submit" className="btn btn-block btn-primary">{message}</button>
          </form>
        </div>
        <div className="or buffer">
          <div className="back-line">
            <span>OR</span>
          </div>
        </div>
        <div className="buffer oauth">
          <p>
            <a
              target="_self"
              href="/auth/google"
              className="btn btn-social btn-google">
              <i className="fa fa-google" />
              <span>{message} with Google</span>
            </a>
          </p>
          <p>
            <a
              target="_self"
              href="/auth/github"
              className="btn btn-social btn-github">
              <i className="fa fa-github" />
              <span>{message} with GitHub</span>
            </a>
          </p>
          <p>
            <a
              target="_self"
              href="/auth/twitter"
              className="btn btn-social btn-twitter">
              <i className="fa fa-twitter" />
              <span>{message} with Twitter</span>
            </a>
          </p>
        </div>
      </div>
    );
  }

  onLoginSubmit(event) {
    event.preventDefault();
    this.props.login({
      email: event.target.email.value,
      password: event.target.password.value
    })
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = () => ({ message: 'Log in' });
const mapDispatch = (dispatch, ownProps) => ({ 
  login: credentials => dispatch(loginFromReducer(credentials, ownProps.history)) 
});

export default connect(mapState, mapDispatch)(Login);
