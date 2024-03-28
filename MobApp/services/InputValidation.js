import React from 'react';

const validateLogin = ({ userName, password }) => {
  if (!userName.trim() && !password.trim()) {
    alert('Please Enter Username and password');
    return false;
  }
  if (!userName.trim()) {
    alert('Please Enter Username');
    return false;
  }
  if (!password.trim()) {
    alert('Please Enter Password');
    return false;
  }
  return true;
};

const validateSignup = ({ name, email, address, phoneNo, userName, gender, password,confirmPassword }) => {
  if (!name.trim()) {
    alert('Please Enter your Name');
    return false;
  }
  if (!email.trim()) {
    alert('Please Enter your email');
    return false;
  }
  if (!/\S+@\S+\.\S+/.test(email.trim())) {
    alert('Email is Invalid');
    return false;
  }
  if (!address.trim()) {
    alert('Please Enter your address');
    return false;
  }
  if (!phoneNo.trim()) {
    alert('Please Enter Phone Number');
    return false;
  }

  const phoneRegex = /^\d{10}$/;

  if (!phoneRegex.test(phoneNo.trim())) {
    alert('Phone number should be numeric and should contain 10 digits');
    return false;
  }

  if (!userName.trim()) {
    alert('Please Enter Username');
    return false;
  }

  if (!gender.trim()) {
    alert('Please Select Gender');
    return false;
  }

  if (userName.trim().length < 4) {
    alert('Username Length is less than 4');
    return false;
  }
  if (!password.trim()) {
    alert('Please Enter Password');
    return false;
  }
  if(password.length<6){
    alert('Password Length is less than 6')
    return false;
  }
  if (!password.match(/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[\W_])[a-zA-Z0-9\W_]{8,}$/)) {
    alert('Password must contain at least one letter, one number, and one special character');
    return false;
  }
  if(!confirmPassword.trim()){
    alert('Please Enter Confirm Password');
    return false;
  }
  if(password!==confirmPassword){
    alert('Password\'s do not match');
    return false;
  }

  return true;
};

const LoginInputValidation = ({ userName, password }) => validateLogin({ userName, password });

const SignupInputValidation = ({ name, email, address, phoneNo, userName, gender, password, confirmPassword }) =>
  validateSignup({ name, email, address, phoneNo, userName, gender, password, confirmPassword });

export { LoginInputValidation, SignupInputValidation };
