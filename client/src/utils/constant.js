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
     ADMIN_CREATE_ACCOUNT: '/system/director/create/account/admin-transaction-or-collection',
     TRANSACTION_ADMIN_CREATE_ACCOUNT: '/transaction-admin/manager/create-account',
     COLLECTION_ADMIN_CREATE_ACCOUNT: '/collection-admin/manager/create-account',
     ADMIN_MANAGE_COLLECTION_AND_TRANSACTION: '/system/director/create/account/admin-transaction-or-collection',
     ADMIN_STATISTIC_PARCEL: '/system/director/statistics/parcels',
     ADMIN_MANAGE_TRANSACTION: '/system/admin/management-transaction',
     ADMIN_MANAGE_COLLECTION: '/system/admin/management-collection',
     TRANSACTION_STAFF_CREATE_PARCEL: '/transaction-staff/manage/create-parcel',
     COLLECTION_STAFF_MANAGE_PARCEL: '/collection-staff/manage/parcel',
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
               // valueGetter: (params) => params.row.s_address.s_address,
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
               width: 100,
          },
          {
               field: 'status',
               headerName: 'Status',
               sortable: true,
               width: 100,
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
     columnsTransactionStaff: [
          { field: 'id', headerName: 'ID', width: 90 },

          {
               field: 'staff_id',
               headerName: 'Staff ID',
               width: 300,
          },
          {
               field: 'username',
               headerName: 'Username',
               description: 'This column has a value getter and is not sortable.',
               sortable: true,
               width: 300,
          },
          {
               field: 'phone',
               headerName: 'Phone',
               type: 'text',
               width: 300,
          },
          // {
          //      field: 'transaction_zip_code',
          //      headerName: 'Transaction Zip code',
          //      type: 'text',
          //      width: 200,
          // },
     ],
     columnsCollectionStaff: [
          { field: 'id', headerName: 'ID', width: 100 },

          {
               field: 'staff_id',
               headerName: 'Staff ID',
               width: 300,
               editable: false,
          },
          {
               field: 'phone',
               headerName: 'Phone',
               type: 'text',
               width: 300,
               editable: false,
          },
          {
               field: 'username',
               headerName: 'Username',
               sortable: true,
               width: 300,
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
