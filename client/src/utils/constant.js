export const path = {
     HOME: '/',
     LOGIN: '/login',
     LOG_OUT: '/logout',
     SYSTEM: '/system',
     HOMEPAGE: '/home',
     REGISTER: '/register',
     FORGOT_PASSWORD: '/forget-password',
     TRANSACTION_ADMIN: '/transaction-admin/',
     COLLECTION_ADMIN: '/collection-admin/',
     TRANSACTION_STAFF: '/transaction-staff',
     COLLECTION_STAFF: '/collection-staff',
};

export const manageActions = {
     ADD: 'ADD',
     EDIT: 'EDIT',
     DELETE: 'DELETE',
     CREATE: 'CREATE',
};

export const dateFormat = {
     SEND_TO_SERVER: 'DD/MM/YYYY',
};
export const options = {
     OptionSelectionType: [
          { value: 'PACKAGE', label: 'Package' },
          { value: 'DOCUMENT', label: 'Document' },
     ],
     OptionSelectionPayment: [
          { value: 'PAID', label: 'Paid' },
          { value: 'UNPAID', label: 'Unpaid' },
     ],
     optionStatusParcel: [
          { value: 'ALL', label: 'All' },
          { value: 'PENDING', label: 'Pending' },
          { value: 'SHIPPING', label: 'Shipping' },
          { value: 'DELIVERING', label: 'Delivering' },
          { value: 'DELIVERED', label: 'Delivered' },
          { value: 'RETURNED', label: 'Returned' },
     ],
     columnsParcels: [
          { field: 'id', headerName: 'ID', width: 90 },

          {
               field: 's_name',
               headerName: 'Sender Name',
               width: 150,
               editable: false,
          },
          {
               field: 's_phone',
               headerName: 'Sender Phone',
               type: 'text',
               width: 200,
               editable: false,
          },
          {
               field: 's_address',
               headerName: 'Sender address',
               // description: 'This column has a value getter and is not sortable.',
               sortable: true,
               width: 160,
          },
          {
               field: 'r_name',
               headerName: 'Receiver Name',
               sortable: true,
               width: 160,
          },
          {
               field: 'r_phone',
               headerName: 'Receiver Phone',
               type: 'text',
               width: 200,
               editable: false,
          },
          {
               field: 'r_address',
               headerName: 'Receiver address',
               sortable: true,
               width: 160,
          },
          {
               field: 'cost',
               headerName: 'Cost',
               sortable: true,
               width: 160,
          },
          {
               field: 'payment_status',
               headerName: 'Payment Status',
               sortable: true,
               width: 160,
          },
     ],
};
