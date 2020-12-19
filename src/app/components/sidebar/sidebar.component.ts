import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../Service/Authentication/auth.service';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  access: Array<any>;
}

export const ROUTES: RouteInfo[] = [
  {path: '/dashboard', title: 'Dashboard', icon: 'ni-tv-2 text-primary', class: '', access: [0, 0, 0]},
  {path: '/addBranch', title: 'Add Branch', icon: 'ni-planet text-blue', class: '', access: [1, 1, 1]},
  {path: '/addManager', title: 'Add Manager', icon: 'ni-pin-3 text-orange', class: '', access: [1, 1, 1]},
  {path: '/addMainLocation', title: 'Add Main Location', icon: 'ni-single-02 text-yellow', class: '', access: [1, 1, 2]},
  {path: '/addSubLocation', title: 'Add Sub Location', icon: 'ni-bullet-list-67 text-red', class: '', access: [1, 1, 2]},
  {path: '/viewSubLocation', title: 'View Sub Location', icon: 'ni-key-25 text-info', class: '', access: [1, 1, 2]},
  {path: '/viewMainLocation', title: 'View Main Location', icon: 'ni-circle-08 text-pink', class: '', access: [1, 1, 2]},
  {path: '/addCategory', title: 'Add Category', icon: 'ni-planet text-blue', class: '', access: [1, 1, 2]},
  {path: '/viewCategory', title: 'View Category', icon: 'ni-pin-3 text-orange', class: '', access: [1, 1, 2]},
  {path: '/addUnit', title: 'Add Unit', icon: 'ni-single-02 text-yellow', class: '', access: [1, 1, 2]},
  {path: '/viewUnit', title: 'View Unit', icon: 'ni-single-02 text-yellow', class: '', access: [1, 1, 2]},
  {path: '/viewBranch', title: 'View Branch', icon: 'ni-bullet-list-67 text-red', class: '', access: [1, 1, 1]},
  {path: '/addProduct', title: 'Add Product', icon: 'ni-key-25 text-info', class: '', access: [1, 1, 2]},
  {path: '/listProducts', title: 'List Product', icon: 'ni-circle-08 text-pink', class: '', access: [1, 1, 2]},
  {path: '/addAddons', title: 'Add Addons', icon: 'ni-single-02 text-yellow', class: '', access: [1, 1, 2]},
  {path: '/addAddonsCategory', title: 'Add Addons Category', icon: 'ni-bullet-list-67 text-red', class: '', access: [1, 1, 2]},
  {path: '/viewAddonsCategory', title: 'View Addons Category', icon: 'ni-key-25 text-info', class: '', access: [1, 1, 2]},
  {path: '/viewAddons', title: 'View  Addons', icon: 'ni-circle-08 text-pink', class: '', access: [1, 1, 2]},
  {path: '/viewOrder', title: 'View  Order', icon: 'ni-circle-08 text-pink', class: '', access: [1, 1, 2]},
  {path: '/addPromocode', title: 'Add  Promocode', icon: 'ni-circle-08 text-pink', class: '', access: [1, 1, 2]},
  {path: '/viewPromocode', title: 'View  Promocode', icon: 'ni-circle-08 text-pink', class: '', access: [1, 1, 2]},
  {path: '/Company-Profile', title: 'Company Profile', icon: 'ni-circle-08 text-pink', class: '', access: [1, 1, 0]},
  {path: '/list-customers', title: 'Customers', icon: 'ni-circle-08 text-pink', class: '', access: [1, 1, 2]}


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

}
