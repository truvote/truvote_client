import React from 'react';
import { connect } from 'react-redux';
import { signup } from '../redux/auth';

/* -----------------    COMPONENT     ------------------ */

class Signup extends React.Component {

  constructor(props) {
    super(props);
    this.onSignupSubmit = this.onSignupSubmit.bind(this);
  }

  render() {
    const { message } = this.props;
    return (
      <div >
        <div >
          <form onSubmit={this.onSignupSubmit}>
            <div >
              <label>email</label>
              <input
                name="email"
                type="email"
                required
              />
            </div>
            <div >
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
        <div >
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

  onSignupSubmit(event) {
    event.preventDefault();
    this.props.signup({
      email: event.target.email.value,
      password: event.target.password.value
    })
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = () => ({ message: 'Sign up' });

const mapDispatch = (dispatch, ownProps) => (
  {
    signup: credentials => {
      dispatch(signup(credentials, ownProps.history));
    }
  })

export default connect(mapState, mapDispatch)(Signup);
