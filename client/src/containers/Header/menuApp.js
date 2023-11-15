export const adminMenu = [
     //quan li nguoi dung
     {
          name: 'Manage Account',
          menus: [
               {
                    name: 'Create Account',
                    link: '/system/director/create/account/admin-transition-or-collection',
               },
          ],
     },
     {
          name: 'Manage Collection & Transition',
          menus: [
               {
                    name: 'Manage Collection',
                    link: '/system/admin/management-collection',
               },
               {
                    name: 'Manage Transition',
                    link: '/system/admin/management-transition',
               },
          ],
     },
     {
          name: 'Statistic',
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
