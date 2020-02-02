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
      <div>
        <div>
          <form onSubmit={this.onLoginSubmit}>
            <div >
              <label>email</label>
              <input
                name="email"
                type="email"
                required
              />
            </div>
            <div>
              <label>password</label>
              <input
                name="password"
                type="password"
                required
              />
            </div>
            <button type="submit">{message}</button>
          </form>
        </div>
        <div>
          <div>
            <span>OR</span>
          </div>
        </div>
        <div>
          <p>
            <a
              target="_self"
              href="/auth/google">
              <i/>
              <span>{message} with Google</span>
            </a>
          </p>
          <p>
            <a
              target="_self"
              href="/auth/github">
              <i/>
              <span>{message} with GitHub</span>
            </a>
          </p>
          <p>
            <a
              target="_self"
              href="/auth/twitter">
              <i/>
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
