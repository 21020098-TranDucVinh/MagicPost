import axios from '../axios';

// Create new transaction staff
const colStaffConfirmReceiveOrder = (body, accessToken) => {
     return axios.post('/tracking/receive', body, {
          headers: { Authorization: `Bearer ${accessToken}` },
     });
};
// Create new transaction staff
const getAllReceivedParcels = (zip_code, accessToken) => {
     return axios.get(`/tracking/listReceived/${zip_code}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
     });
};
export { colStaffConfirmReceiveOrder, getAllReceivedParcels };
