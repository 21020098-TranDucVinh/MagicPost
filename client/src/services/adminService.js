import axios from '../axios';
const handleLoginAPI = (body) => {
     return axios.post('/login', body);
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
/* ============================================ */
// Create new Transaction
const handleCreateNewTransaction = (body) => {
     return axios.post('/transactions', body);
};
// get all transactions
const getAllTransactions = () => {
     return axios.get('/transactions');
};
// get all admin transactions
const getAllAdminTransactions = () => {
     return axios.get('/api/admin_transaction');
};
const deleteTransactionById = (id) => {
     return axios.delete(`/transactions/${id}`);
};
// edit user pending
const editTransaction = (body) => {
     return axios.put(`/transactions/${body.zip_code}`, body);
};
/* ============================================ */
// * Collection * //
const getAllCollections = () => {
     return axios.get('/collections');
};
// get all admin collections
const getAllAdminCollections = () => {
     return axios.get('/api/admin_collection');
};
// create new Collection
const handleCreateNewCollection = (body) => {
     return axios.post('/collections', body);
};
//delete Collection
const deleteCollectionById = (zip_code) => {
     return axios.delete(`/collections/${zip_code}`);
};
//edit collection
const editCollection = (body) => {
     return axios.put(`/collections/${body.zip_code}`, body);
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
     getAllAdminTransactions,
     getAllAdminCollections,
     editTransaction,
     editCollection,
};
