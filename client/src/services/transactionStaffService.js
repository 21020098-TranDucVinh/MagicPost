import axios from '../axios';

// Create new transaction staff
const handleCreateNewParcel = (body) => {
  return axios.post('/parcels', body);
};
// get all pending parcel
const getAllPendingParcel = () => {
  return axios.get('/allParcelsPending');
};
// Create new transaction staff
const handleSendParcelsToCol = (body, accessToken) => {
  return axios.post('/tracking/send', body, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};
const handleUpdateStatusParcel = (body, accessToken) => {
  return axios.put(`/parcels/${body?.parcel_id}`, body, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};
// get all pending parcel by transaction Id
const getAllPendingParcelByTransactionId = (transactionId, accessToken) => {
  return axios.get(`/parcelsPendingByTransaction/${transactionId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};
const handleSendParcelsToReceiver = (body, accessToken) => {
  return axios.put(`/parcels/`, body, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};
// get all delivering parcel by transaction Id
const getAllDeliveringParcelByTransactionId = (transactionId, accessToken) => {
  return axios.get(`/allParcelsDelivering`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};
// get all delivering parcel by transaction Id
const getAllParcelByTransactionId = (transactionId) => {
  return axios.get(`/allParcelByTransaction/${transactionId}`);
};
// get all delivering parcel by transaction Id
const getStatisticParcelsByTransaction = (transactionId) => {
  return axios.get(`/statisticParcelsByTransaction/${transactionId}`);
};
const handleConfirmParcelDeliveryUnsuccess = (body, accessToken) => {
  return axios.put(`/tracking/return`, body, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};
// get all delivering parcel by transaction Id
const getTrackingByParcelId = (parcelId) => {
  return axios.get(`/tracking/${parcelId}`);
};
// get all delivering parcel by transaction Id
const getParcelsReturnedByTransaction = (tranId) => {
  return axios.get(`/parcelsReturnedByTransaction/${tranId}`);
};
export {
  handleCreateNewParcel,
  getAllPendingParcel,
  handleSendParcelsToCol,
  handleUpdateStatusParcel,
  getAllPendingParcelByTransactionId,
  handleSendParcelsToReceiver,
  getAllDeliveringParcelByTransactionId,
  getAllParcelByTransactionId,
  getStatisticParcelsByTransaction,
  handleConfirmParcelDeliveryUnsuccess,
  getTrackingByParcelId,
  getParcelsReturnedByTransaction,
};
