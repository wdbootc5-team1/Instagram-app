import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isEmpty from '../../validation/is-empty';

class ProfileItem extends Component {
    render() {
        const { profile } = this.props;

        return (
            <div className="card card-body bg-light mb-3">
                <div className="row">
                    <div className="col-2">
                        <img src={profile.user.avatar} alt="" className="rounded-circle" />
                    </div>
                    <div className="col-lg-6 col-md-4 col-8">
                        <h3>{profile.user.name}</h3>
<<<<<<< HEAD
                        <p>
                            {profile.status}{' '}
                        </p>
=======

>>>>>>> 9b1c0eb42c7b315ac6cc90a41557537de1bcada1
                        <p>
                            {isEmpty(profile.location) ? null : (
                                <span>{profile.location}</span>
                            )}
                        </p>
                        <Link to={`/profile/${profile.handle}`} className="btn btn-info">
                            View Profile
            </Link>
                    </div>
                </div>
            </div>
        );
    }
}

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired
};

export default ProfileItem;
