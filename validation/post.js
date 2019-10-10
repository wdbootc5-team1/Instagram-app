const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePostInput(data) {
  let errors = {};

  data.pictureUrl = !isEmpty(data.pictureUrl) ? data.pictureUrl : '';

  if (Validator.isEmpty(data.pictureUrl)) {
    errors.pictureUrl = 'Picture Url is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

