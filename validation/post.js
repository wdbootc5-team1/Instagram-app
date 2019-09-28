const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePostInput(data) {
  let errors = {};

  data.pictureUrl = !isEmpty(data.pictureUrl) ? data.pictureUrl : '';

  // if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
  //   errors.text = 'Post must be between 10 and 300 characters';
  // }

  if (Validator.isEmpty(data.pictureUrl)) {
    errors.pictureUrl = 'Picture Url is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

