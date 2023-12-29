export const adminMenu = [
     //quan li nguoi dung
     {
          name: 'Manage Account',
          menus: [
               {
                    name: 'Create Account',
                    link: '/system/director/create/account/admin-transaction-or-collection',
               },
          ],
     },
     {
          name: 'Manage Collection & Transaction',
          menus: [
               {
                    name: 'Manage Collection',
                    link: '/system/admin/management-collection',
               },
               {
                    name: 'Manage Transaction',
                    link: '/system/admin/management-transaction',
               },
          ],
     },
     {
          name: 'Statistic parcel',
          menus: [
               {
                    name: 'Statistic',
                    link: '/system/director/statistics/parcels',
               },
          ],
     },
];

export const transactionManageMenu = [
     //quan li nguoi dung
     {
          name: 'Manage Account',
          menus: [
               {
                    name: 'Create Account',
                    link: '/transaction-admin/manager/create-account',
               },
          ],
     },
     {
          name: 'Statistic parcel',
          menus: [
               {
                    name: 'Statistic',
                    link: '/transaction-admin/manager/statistic-parcel',
               },
          ],
     },
];
export const collectionManageMenu = [
     //quan li nguoi dung
     {
          name: 'Manage Account',
          menus: [
               {
                    name: 'Create Account',
                    link: '/collection-admin/manager/create-account',
               },
          ],
     },
     {
          name: 'Statistic parcel',
          menus: [
               {
                    name: 'Statistic',
                    link: '/collection-admin/manager/statistic-parcel',
               },
          ],
     },
];

export const transactionStaffMenu = [
     //quan li nguoi dung
     {
          name: 'Parcel for shipment',
          menus: [
               {
                    name: 'Record Parcel',
                    link: '/transaction-staff/manage/create-parcel',
               },
               {
                    name: 'Parcel',
                    link: '/transaction-staff/manage/parcel',
               },
          ],
     },
     {
          name: 'Arrived shipment ',
          menus: [
               {
                    name: 'Orders',
                    link: '/transaction-staff/manage/arrived-invoice',
               },
               {
                    name: 'Send to receiver',
                    link: '/transaction-staff/create/send/parcel-to-client',
               },
               {
                    name: 'Parcel in delivering',
                    link: '/transaction-staff/manage/parcel-delivering',
               },
               {
                    name: 'Parcel unsuccessful',
                    link: '/transaction-staff/manage/parcel/parcel-unsuccessful',
               },
          ],
     },
     {
          name: 'Statistic parcel',
          menus: [
               {
                    name: 'Statistic',
                    link: '/transaction-staff/statistic-parcel',
               },
          ],
     },
];
export const collectionStaffMenu = [
     //quan li nguoi dung
     {
          name: 'Parcel for shipment',
          menus: [
               {
                    name: 'Record Parcel',
                    link: '/collection-staff/manage/parcel',
               },
               // {
               //      name: 'Orders',
               //      link: '/collection-staff/manage/create-order/send/collection',
               // },
               // {
               //      name: 'Orders To transaction',
               //      link: '/collection-staff/manage/create-order/send/transaction',
               // },
          ],
     },
     {
          name: 'Arrived shipment ',
          menus: [
               {
                    name: 'Invoice',
                    link: '/collection-staff/manage/arrived-invoice',
               },
          ],
     },
     {
          name: 'statistic parcel',
          menus: [
               {
                    name: 'Orders',
                    link: '/collection-staff/manage/create-order/send/collection',
               },
          ],
     },
];
