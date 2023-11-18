import axios from '../axios';
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
const deleteUserPending = (id) => {
     return axios.delete(`/admin/${id}`);
};
const editUserPending = (body) => {
     return axios.put(`/admin/${body.id}`, body);
};

// Create new Transition
const handleCreateNewTransition = (body) => {
     return axios.post('/transactions', body);
};
// get all transitions
const getAllTransitions = () => {
     return axios.get('/transactions');
};

// * Collection * //
const getAllCollections = () => {
     return axios.get('/collections');
};

const deleteTransitionById = (id) => {
     return axios.delete(`/transactions/${id}`);
};

export {
     handleLoginAPI,
     getAllUserPending,
     handleCreateNewPotentialAdmin,
     handleCreateNewTransition,
     getAllTransitions,
     deleteTransitionById,
     getAllCollections,
     deleteUserPending,
     editUserPending,
};
