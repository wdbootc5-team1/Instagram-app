import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <table align="center">
                  <tbody>
                    <tr>
                      <td><img src={require('../../img/index1.jpg')} alt="Welcome to Instagram" /></td>
                      <td>
                        <h1 className="display-3 mb-4">Instagram</h1>
                        <p className="lead"> Create an Instagram profile and share posts to the world</p>
                        <hr />
                        <Link to="/register" className="btn btn-lg btn-info mr-2">Sign Up</Link>
                        <Link to="/login" className="btn btn-lg btn-light">Login</Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);