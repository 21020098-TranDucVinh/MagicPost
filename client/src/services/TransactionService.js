import axios from '../axios';

// Create new transaction staff
const handleTransactionCreateNewStaff = (body) => {
     return axios.post('/staff', body);
};
// get transaction by ID
const getTransactionById = (transactionID) => {
     return axios.get('/transaction_staff/T00012');
};
//delete staff by staff id
const deleteStaffByStaffId = (staff_id) => {
     return axios.delete(`/staff/${staff_id}`);
};
//edit transaction staff
const editTransactionStaff = (body) => {
     return axios.put(`/staff/${body.staff_id}`, body);
};
export { handleTransactionCreateNewStaff, getTransactionById, deleteStaffByStaffId, editTransactionStaff };
