import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../Service/Authentication/auth.service';

declare interface RouteInfo {
  label: string,
  // path: string;
  // title: string;
  // icon: string;
  // class: string;
  // access: Array<any>;
  main: Array<any>;
}

export const ROUTES: RouteInfo[] = [
  {
    label: 'General',
    main: [
      {
        title: 'Locations', icon: 'ni-pin-3 text-danger', class: '', access: [0, 0, 0],
        visible: false,
        sub: [
          {
            path: '/addMainLocation', title: 'Add Main Location', icon: 'ni-tv-2 text-primary', class: '', access: [0, 0, 0]
          },
          {
            path: '/addSubLocation', title: 'Add Sub Location', icon: 'ni-tv-2 text-primary', class: '', access: [0, 0, 0]
          },
          {
            path: '/viewMainLocation', title: 'View Main Location', icon: 'ni-tv-2 text-primary', class: '', access: [0, 0, 0]
          },
          {
            path: '/viewSubLocation', title: 'View Sub Location', icon: 'ni-tv-2 text-primary', class: '', access: [0, 0, 0]
          },
        ]
      },
      {
        title: 'Orders', icon: 'ni-bag-17 text-primary', class: '', access: [1, 1, 2],
        visible: false,
        sub: [
          {
            path: '/viewOrder', title: 'Orders', icon: 'ni-bag-17 text-primary', class: '', access: [0, 1, 0]
          }
        ]
      },
      {
        title: 'Company', icon: 'ni-building text-danger', class: '', access: [1, 1, 1],
        visible: false,
        sub: [
          {
            path: '/Company-Profile', title: 'Company profile', icon: 'ni-tv-2 text-primary', class: '', access: [1, 1, 1]
          }
        ]
      },
      {
        title: 'Company', icon: 'ni-building text-danger', class: '', access: [0, , 0],
        visible: false,
        sub: [
          {
            path: '/addCompany', title: 'Add Company', icon: 'ni-tv-2 text-primary', class: '', access: [0, 0, 0]
          },
          {
            path: '/viewCompany', title: 'View Company', icon: 'ni-tv-2 text-primary', class: '', access: [0, 0, 0]
          }
        ]
      }
      , {
        title: 'Customers', icon: 'fa fa-user text-yellow', class: '', access: [0, 0, 0],
        visible: false,
        sub: [
          {
            path: '/list-customers', title: 'List Customers', icon: 'ni-tv-2 text-primary', class: '', access: [0, 0, 0]
          }
        ]
      }
    ],
  },
  {
    label: 'Configuration',
    main: [
      {
        title: 'Branch', icon: 'fas fa-code-branch text-primary', class: '', access: [1, 1, 1],
        visible: false,
        sub: [
          {
            path: '/addBranch', title: 'Add Branch', icon: 'ni-tv-2 text-primary', class: '', access: [0, 1, 0]
          },
          {
            path: '/viewBranch', title: 'View Branch', icon: 'ni-tv-2 text-primary', class: '', access: [0, 1, 0]
          }
        ]
      },
      {
        title: 'Managers', icon: 'ni-hat-3 text-danger', class: '', access: [1, 1, 1],
        sub: [
          {
            path: '/addManager', title: 'Add Manager', icon: 'ni-tv-2 text-primary', class: '', access: [1, 1, 1]
          }
        ]
      }
    ],
  },
  {
    label: 'Products Configuration',
    main: [
      {
        title: 'Units', icon: 'fa fa-balance-scale text-primary', class: '', access: [2, 1, 2],
        visible: false,
        sub: [
          {
            path: '/addUnit', title: 'Add Unit', icon: 'ni-tv-2 text-primary', class: '', access: [2, 1, 2]
          },
          {
            path: '/viewUnit', title: 'View Unit', icon: 'ni-tv-2 text-primary', class: '', access: [2, 1, 2]
          }
        ]
      },
      {
        title: 'Categories', icon: 'fa fa-list-alt text-danger', class: '', access: [2, 1, 1],
        sub: [
          {
            path: '/addCategory', title: 'Add Category', icon: 'ni-tv-2 text-primary', class: '', access: [2, 1, 1]
          },
          {
            path: '/viewCategory', title: 'View Category', icon: 'ni-tv-2 text-primary', class: '', access: [2, 1, 1]
          }
        ]
      },
      {
        title: 'Products', icon: 'ni-box-2 text-yellow', class: '', access: [2, 1, 1],
        sub: [
          {
            path: '/addProduct', title: 'Add Product', icon: 'ni-tv-2 text-primary', class: '', access: [2, 1, 1]
          },
          {
            path: '/listProducts', title: 'List Products', icon: 'ni-tv-2 text-primary', class: '', access: [2, 1, 1]
          }
        ]
      },
      {
        title: 'Add-Ons', icon: 'fa fa-plug text-orange', class: '', access: [2, 1, 1],
        sub: [
          {
            path: '/addAddonsCategory', title: 'Add Add-Ons Category', icon: 'ni-tv-2 text-primary', class: '', access: [2, 1, 1]
          },
          {
            path: '/viewAddonsCategory', title: 'View Add-Ons Category', icon: 'ni-tv-2 text-primary', class: '', access: [2, 1, 1]
          },
          {
            path: '/addAddons', title: 'Add Add-Ons', icon: 'ni-tv-2 text-primary', class: '', access: [2, 1, 1]
          },
          {
            path: '/viewAddons', title: 'View Add-Ons ', icon: 'ni-tv-2 text-primary', class: '', access: [2, 1, 1]
          }
        ]
      }
    ],
  },
  {
    label: 'Marketing',
    main: [
      {
        title: 'Promo code', icon: ' fa fa-tag text-primary', class: '', access: [2, 1, 2],
        visible: false,
        sub: [
          {
            path: '/addPromocode', title: 'Add Promo code', icon: 'ni-tv-2 text-primary', class: '', access: [2, 1, 2]
          },
          {
            path: '/viewPromocode', title: 'View Promo code', icon: 'ni-tv-2 text-primary', class: '', access: [2, 1, 2]
          }
        ]
      }
    ],
  }
  // {path: '/addBranch', title: 'Add Branch', icon: 'ni-planet text-blue', class: '', access: [1, 1, 1]},
  // {path: '/addManager', title: 'Add Manager', icon: 'ni-pin-3 text-orange', class: '', access: [1, 1, 1]},
  // {path: '/addMainLocation', title: 'Add Main Location', icon: 'ni-single-02 text-yellow', class: '', access: [0, 0, 0]},
  // {path: '/addSubLocation', title: 'Add Sub Location', icon: 'ni-bullet-list-67 text-red', class: '', access: [0, 0, 0]},
  // {path: '/viewSubLocation', title: 'View Sub Location', icon: 'ni-key-25 text-info', class: '', access: [0, 0, 0]},
  // {path: '/viewMainLocation', title: 'View Main Location', icon: 'ni-circle-08 text-pink', class: '', access: [0, 0, 0]},
  // {path: '/addCategory', title: 'Add Category', icon: 'ni-planet text-blue', class: '', access: [1, 1, 2]},
  // {path: '/viewCategory', title: 'View Category', icon: 'ni-pin-3 text-orange', class: '', access: [1, 1, 2]},
  // {path: '/addUnit', title: 'Add Unit', icon: 'ni-single-02 text-yellow', class: '', access: [1, 1, 2]},
  // {path: '/viewUnit', title: 'View Unit', icon: 'ni-single-02 text-yellow', class: '', access: [1, 1, 2]},
  // {path: '/viewBranch', title: 'View Branch', icon: 'ni-bullet-list-67 text-red', class: '', access: [1, 1, 1]},
  // {path: '/addProduct', title: 'Add Product', icon: 'ni-key-25 text-info', class: '', access: [1, 1, 2]},
  // {path: '/listProducts', title: 'List Product', icon: 'ni-circle-08 text-pink', class: '', access: [1, 1, 2]},
  // {path: '/addAddons', title: 'Add Addons', icon: 'ni-single-02 text-yellow', class: '', access: [1, 1, 2]},
  // {path: '/addAddonsCategory', title: 'Add Addons Category', icon: 'ni-bullet-list-67 text-red', class: '', access: [1, 1, 2]},
  // {path: '/viewAddonsCategory', title: 'View Addons Category', icon: 'ni-key-25 text-info', class: '', access: [1, 1, 2]},
  // {path: '/viewAddons', title: 'View  Addons', icon: 'ni-circle-08 text-pink', class: '', access: [1, 1, 2]},
  // {path: '/viewOrder', title: 'View  Order', icon: 'ni-circle-08 text-pink', class: '', access: [1, 1, 2]},
  // {path: '/addPromocode', title: 'Add  Promocode', icon: 'ni-circle-08 text-pink', class: '', access: [1, 1, 2]},
  // {path: '/viewPromocode', title: 'View  Promocode', icon: 'ni-circle-08 text-pink', class: '', access: [1, 1, 2]},
  // {path: '/Company-Profile', title: 'Company Profile', icon: 'ni-circle-08 text-pink', class: '', access: [1, 1, 0]},
  // {path: '/list-customers', title: 'Customers', icon: 'ni-circle-08 text-pink', class: '', access: [1, 1, 2]}


  // { path: '/icons', title: 'Icons',  icon:'ni-planet text-blue', class: '' },
  // { path: '/maps', title: 'Maps',  icon:'ni-pin-3 text-orange', class: '' },
  // { path: '/user-profile', title: 'User profile',  icon:'ni-single-02 text-yellow', class: '' },
  // { path: '/tables', title: 'Tables',  icon:'ni-bullet-list-67 text-red', class: '' },
  // { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '' },
  // { path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;
  toggleMenuCity;
  userData: any = [];

  constructor(private router: Router, public authService: AuthService) {
  }

  ngOnInit() {
    this.userData = this.authService.getUserDetails();
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });

  }

  getAccessright(menu) {
    if (menu['access'][0] === this.userData.user_type ||
      menu['access'][1] === this.userData.user_type ||
      menu['access'][2] === this.userData.user_type) {
      return true;
    } else {
      return false;
    }
  }

  getLabelAccessright(menu) {
    let isMatch = false;
    for (const item of menu.main) {
      item.access.forEach(element => {
        if (element == this.userData.user_type) {
          isMatch = true;
          return false;
        }
      });
    }
    return isMatch;
  }

}
