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
                    // subMenus: [
                    //      {
                    //           name: 'Thach nhe',
                    //           link: '/system/user-crud',
                    //      },
                    // ],
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
                    name: 'Orders',
                    link: '/transaction-staff/manage/create-order/send/collection',
               },
          ],
     },
     {
          name: 'Statistic parcel',
          menus: [
               {
                    name: 'Orders',
                    link: '/transaction-staff/manage/create-order/send/collection',
               },
          ],
     },
];
