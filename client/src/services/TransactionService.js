import axios from '../axios';

// Create new transaction staff
const handleTransactionCreateNewStaff = (body) => {
     return axios.post('/staff', body);
};
// get transaction by ID
const getTransactionById = (transactionID) => {
     return axios.get('/transaction_staff/T00012');
};

export { handleTransactionCreateNewStaff, getTransactionById };
