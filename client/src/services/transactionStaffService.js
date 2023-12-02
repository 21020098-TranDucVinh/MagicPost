import axios from '../axios';

// Create new transaction staff
const handleCreateNewParcel = (body) => {
     return axios.post('/parcels', body);
};
// get all pending parcel
const getAllPendingParcel = () => {
     return axios.get('/parcelsPending');
};
export { handleCreateNewParcel, getAllPendingParcel };
