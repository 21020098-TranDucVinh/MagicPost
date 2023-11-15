import axios from '../axios';
// import axios from 'axios';
const handleLoginAPI = (userEmail, userPassword) => {
     return axios.post('/api/login', { email: userEmail, password: userPassword });
};
// Create new potential admin
const handleCreateNewPotentialAdmin = (body) => {
     return axios.post('/admin', body);
};
// get all user pending
const getAllUserPending = () => {
     return axios.get('/adminPending');
};
// Delete user Pending
const DeleteUserPending = () => {
     return axios.get('/adminPending');
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
     getAllUserPending,
     handleCreateNewPotentialAdmin,
     handleCreateNewTransition,
     getAllTransitions,
     deleteTransitionById,
     getAllCollections,
     DeleteUserPending,
};
