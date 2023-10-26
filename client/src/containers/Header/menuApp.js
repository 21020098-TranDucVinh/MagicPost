export const adminMenu = [
     //quan li nguoi dung
     {
          name: 'Quản lí tài khoản',
          menus: [
               {
                    name: 'Tạo tài khoản',
                    link: '/system/director/create/account-captain-point',
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
                    name: 'Hàng gửi',
                    link: '/system/user-crud',
                    // subMenus: [
                    //      {
                    //           name: 'Thach nhe',
                    //           link: '/system/user-crud',
                    //      },
                    // ],
               },
               {
                    name: 'Hàng nhận',
                    link: '/system/user-redux',
               },
          ],
     },
];
