import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  {path: '/dashboard', title: 'Dashboard', icon: 'ni-tv-2 text-primary', class: ''},
  {path: '/addBranch', title: 'Add Branch', icon: 'ni-planet text-blue', class: ''},
  {path: '/addManager', title: 'Add Manager', icon: 'ni-pin-3 text-orange', class: ''},
  {path: '/addMainLocation', title: 'Add Main Location', icon: 'ni-single-02 text-yellow', class: ''},
  {path: '/addSubLocation', title: 'Add Sub Location', icon: 'ni-bullet-list-67 text-red', class: ''},
  {path: '/viewSubLocation', title: 'View Sub Location', icon: 'ni-key-25 text-info', class: ''},
  {path: '/viewMainLocation', title: 'View Main Location', icon: 'ni-circle-08 text-pink', class: ''},
  {path: '/addCategory', title: 'Add Category', icon: 'ni-planet text-blue', class: ''},
  {path: '/viewCategory', title: 'View Category', icon: 'ni-pin-3 text-orange', class: ''},
  {path: '/addUnit', title: 'Add Unit', icon: 'ni-single-02 text-yellow', class: ''},
  {path: '/viewUnit', title: 'View Unit', icon: 'ni-single-02 text-yellow', class: ''},
  {path: '/viewBranch', title: 'View Branch', icon: 'ni-bullet-list-67 text-red', class: ''},
  {path: '/addProduct', title: 'Add Product', icon: 'ni-key-25 text-info', class: ''},
  {path: '/listProducts', title: 'List Product', icon: 'ni-circle-08 text-pink', class: ''},
  {path: '/addAddons', title: 'Add Addons', icon: 'ni-single-02 text-yellow', class: ''},
  {path: '/addAddonsCategory', title: 'Add Addons Category', icon: 'ni-bullet-list-67 text-red', class: ''},
  {path: '/viewAddonsCategory', title: 'View Addons Category', icon: 'ni-key-25 text-info', class: ''},
  {path: '/viewAddons', title: 'View  Addons', icon: 'ni-circle-08 text-pink', class: ''},
  {path: '/viewOrder', title: 'View  Order', icon: 'ni-circle-08 text-pink', class: ''},
  {path: '/addPromocode', title: 'Add  Promocode', icon: 'ni-circle-08 text-pink', class: ''},
  {path: '/viewPromocode', title: 'View  Promocode', icon: 'ni-circle-08 text-pink', class: ''}


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

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
  }
}
