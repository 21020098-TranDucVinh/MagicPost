import axios from '../axios';

const handleLoginAPI = (userEmail, userPassword) => {
     return axios.post('/api/login', { email: userEmail, password: userPassword });
};

const handleCreateNewAccountAdmin = () => {
     return axios.post('/api/create-new-account-admin-transition-collection');
};

export { handleLoginAPI, handleCreateNewAccountAdmin };
