import axios from '../axios';
// import axios from 'axios';
const handleLoginAPI = (userEmail, userPassword) => {
     return axios.post('/api/login', { email: userEmail, password: userPassword });
};

const handleCreateNewAccountAdmin = () => {
     return axios.post('/api/create-new-account-admin-transition-collection');
};
const handleCreateNewTransition = () => {
     return axios.post('/transitions');
};
const getAllTransitions = () => {
     return axios.get('/transactions');
};
const getAllCollections = () => {
     return axios.get('/collections');
};

const deleteTransitionById = (id) => {
     return axios.delete('/delete-transaction', {
          data: {
               id: id,
          },
     });
};
export {
     handleLoginAPI,
     handleCreateNewAccountAdmin,
     handleCreateNewTransition,
     getAllTransitions,
     deleteTransitionById,
     getAllCollections,
};
