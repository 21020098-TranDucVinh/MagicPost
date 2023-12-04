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
     columnsPotentialCandidate: [
          { field: 'id', headerName: 'ID', width: 90 },
          {
               field: 'username',
               headerName: 'User Name',
               sortable: true,
               width: 250,
          },
          {
               field: 'phone',
               headerName: 'Phone',
               sortable: true,
               width: 250,
          },
          { field: 'role', headerName: 'Role', width: 200 },
     ],
     columnsTransaction: [
          { field: 'id', headerName: 'ID', width: 50 },

          {
               field: 'zip_code',
               headerName: 'Zip code',
               width: 120,
               editable: false,
          },
          {
               field: 'name',
               headerName: 'Transaction Name',
               width: 150,
               editable: false,
          },
          {
               field: 'address',
               headerName: 'Address',
               width: 150,
               editable: false,
          },
          {
               field: 'admins',
               headerName: `Manager Name`,
               valueGetter: (params) => params.row.admin.username,
               width: 150,
               editable: false,
          },
          {
               field: 'admin',
               headerName: `Manager's Phone`,
               valueGetter: (params) => params.row.admin.phone,
               width: 150,
               editable: false,
          },
          {
               field: 'collection_zip_code',
               headerName: 'Collection zip code',
               width: 150,
               editable: false,
          },
     ],
     columnsCollection: [
          { field: 'id', headerName: 'ID', width: 50 },
          {
               field: 'zip_code',
               headerName: 'Zip code',
               width: 120,
               editable: false,
          },
          {
               field: 'name',
               headerName: 'Collection Name',
               width: 150,
               editable: false,
          },
          {
               field: 'address',
               headerName: 'Address',
               width: 150,
               editable: false,
          },
          {
               field: 'admins',
               headerName: `Manager Name`,
               valueGetter: (params) => params.row.admin.username,
               width: 150,
               editable: false,
          },
          {
               field: 'admin',
               headerName: `Manager's Phone`,
               valueGetter: (params) => params.row.admin.phone,
               width: 150,
               editable: false,
          },
     ],
};
export const roles = {
     ADMIN: 'ADMIN',
     TRANSACTION_ADMIN: 'TRANSACTION_ADMIN',
     COLLECTION_ADMIN: 'COLLECTION_ADMIN',
     COLLECTION_STAFF: 'COLLECTION_STAFF',
     TRANSACTION_STAFF: 'TRANSACTION_STAFF',
};
