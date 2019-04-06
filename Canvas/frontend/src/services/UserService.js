import axios from 'axios';

loginService = (user) => {
    axios.post('/login', {user})
    .then(response => {
        return response
    })
    .catch(error => {
        return error;
    })
}