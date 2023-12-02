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
};
