import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/postActions';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';


class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
    pictureUrl: '',
    errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const { user } = this.props.auth;

    const newPost = {
      pictureUrl: this.state.pictureUrl,
      name: user.name,
      avatar: user.avatar
    };

    this.props.addPost(newPost);
    this.setState({pictureUrl: '' });
   }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleChange(e) {
    this.setState({
      pictureUrl: URL.createObjectURL(e.target.files[0])
    })
  }
  render() {
    const { errors } = this.state;

    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info bg-light text-black">Share photos...</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <div>
                  <TextAreaFieldGroup
                    placeholder="Create a post"
                    name="pictureUrl"
                    value={this.state.pictureUrl}
                    onChange={this.onChange}
                    error={errors.pictureUrl}
                  />
                  <input type="file" onChange={this.handleChange} />
                  <img src={this.state.pictureUrl} />
                </div>
              </div>
              <button type="submit" className="btn btn-dark">
                Submit
             </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { addPost })(PostForm);