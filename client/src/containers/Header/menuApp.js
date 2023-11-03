export const adminMenu = [
     //quan li nguoi dung
     {
          name: 'Quản lí tài khoản',
          menus: [
               {
                    name: 'Tạo tài khoản',
                    link: '/system/director/create/account/admin-transition-or-collection',
               },
          ],
     },
     {
          name: 'Quản lí đơn hàng',
          menus: [
               {
                    name: 'Đơn hàng tại tụ điểm',
                    link: '/system/user-crud',
               },
               {
                    name: 'Đơn hàng tại điểm giao dịch',
                    link: '/system/user-redux',
               },
          ],
     },
     {
          name: 'Thống kê',
          menus: [
               {
                    name: 'Thống kê',
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
