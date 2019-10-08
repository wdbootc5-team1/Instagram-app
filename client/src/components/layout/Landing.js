import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <table align="center">
                  <tr>
                    <td><img src={require('../../img/index1.jpg')} alt="Welcome to Instagram"/></td>
                    <td>
                      <h1 className="display-3 mb-4">Instagram</h1>
                      <p className="lead"> Create an Instagram profile and share posts to the world</p>
                      <hr />
                      <Link to="/register" className="btn btn-lg btn-info mr-2">Sign Up</Link>
                      <Link to="/login" className="btn btn-lg btn-light">Login</Link>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}