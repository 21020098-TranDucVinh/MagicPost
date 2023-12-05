import axios from '../axios';

// Create new collection staff
const handleCollectionCreateNewStaff = (body) => {
     return axios.post('/staff', body);
};
// // get collection by ID
const getCollectionStaffById = (collection_zip_code) => {
     return axios.get(`/collection_staff/${collection_zip_code}`);
};
export { handleCollectionCreateNewStaff, getCollectionStaffById };
