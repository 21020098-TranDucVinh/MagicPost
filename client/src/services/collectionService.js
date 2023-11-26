import axios from '../axios';

// Create new collection staff
const handleCollectionCreateNewStaff = (body) => {
     return axios.post('/staff', body);
};
// // get collection by ID
const getCollectionStaffById = (collectionID) => {
     return axios.get('/collection_staff/C00001');
};
export { handleCollectionCreateNewStaff, getCollectionStaffById };
