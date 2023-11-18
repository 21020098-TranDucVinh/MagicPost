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
// edit user pending
const editUserPending = (body) => {
     return axios.put(`/admin/${body.id}`, body);
};

// Create new Transaction
const handleCreateNewTransaction = (body) => {
     return axios.post('/transactions', body);
};
// get all transactions
const getAllTransactions = () => {
     return axios.get('/transactions');
};
const deleteTransactionById = (id) => {
     return axios.delete(`/transactions/${id}`);
};

// * Collection * //
const getAllCollections = () => {
     return axios.get('/collections');
};
// create new Collection
const handleCreateNewCollection = (body) => {
     return axios.post('/collections', body);
};
//delete Collection
const deleteCollectionById = (zip_code) => {
     return axios.delete(`/collections/${zip_code}`);
};

export {
     handleLoginAPI,
     getAllUserPending,
     handleCreateNewPotentialAdmin,
     handleCreateNewTransaction,
     getAllTransactions,
     deleteTransactionById,
     getAllCollections,
     deleteUserPending,
     editUserPending,
     handleCreateNewCollection,
     deleteCollectionById,
};
