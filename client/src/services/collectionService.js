import axios from '../axios';

// Create new collection staff
const handleCollectionCreateNewStaff = (body) => {
     return axios.post('/staff', body);
};
// // get collection by ID
const getCollectionStaffById = (collection_zip_code) => {
     return axios.get(`/collection_staff/${collection_zip_code}`);
};
// // get collection by ID
const getParcelsFromTran = (collection_zip_code, accessToken) => {
     return axios.get(`/tracking/listDeliveringReceiver/${collection_zip_code}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
     });
};
// // get collection by ID
const getAllParcelsService = (accessToken) => {
     return axios.get('/parcels', {
          headers: { Authorization: `Bearer ${accessToken}` },
     });
};
export { handleCollectionCreateNewStaff, getCollectionStaffById, getParcelsFromTran, getAllParcelsService };
