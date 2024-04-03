const validateLogin = ({ username, password }) => {
    username=String(username);
    password=String(password);

    if (username.length===0 && password.length===0) {
        alert('Please Enter Username and password');
        return false;
    }
    if (username.length===0) {
        alert('Please Enter Username');
        return false;
    }
    if (password.length===0) {
        alert('Please Enter Password');
        return false;
    }
    return true;
};


const LoginInputValidation = ({ username, password }) => validateLogin({ username, password });

export { LoginInputValidation};
