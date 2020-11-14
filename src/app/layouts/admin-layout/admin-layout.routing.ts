import {Routes} from '@angular/router';

import {DashboardComponent} from '../../pages/dashboard/dashboard.component';
import {IconsComponent} from '../../pages/icons/icons.component';
import {MapsComponent} from '../../pages/maps/maps.component';
import {UserProfileComponent} from '../../pages/user-profile/user-profile.component';
import {TablesComponent} from '../../pages/tables/tables.component';
import {AddBranchComponent} from '../../pages/Branch/add-branch/add-branch.component';
import {AddManagerComponent} from '../../pages/Manager/add-manager/add-manager.component';
import {AddMainLocationComponent} from '../../pages/Location/add-main-location/add-main-location.component';
import {AddSubLocationComponent} from '../../pages/Location/add-sub-location/add-sub-location.component';
import {ViewSubLocationComponent} from '../../pages/Location/view-sub-location/view-sub-location.component';
import {ViewMainLocationComponent} from '../../pages/Location/view-main-location/view-main-location.component';
import {AddCategoryComponent} from '../../pages/Category & Unit/add-category/add-category.component';
import {AddUnitComponent} from '../../pages/Category & Unit/add-unit/add-unit.component';
import {ViewBranchComponent} from '../../pages/Branch/view-branch/view-branch.component';
import {ViewCategoryComponent} from '../../pages/Category & Unit/view-category/view-category.component';
import {ViewUnitComponent} from '../../pages/Category & Unit/view-unit/view-unit.component';
import {AddProductComponent} from '../../pages/Products/add-product/add-product.component';
import {ListProductComponent} from '../../pages/Products/list-product/list-product.component';
import {AddAddonsCategoryComponent} from '../../pages/Products/Addons/add-addons-category/add-addons-category.component';
import {AddAddonsComponent} from '../../pages/Products/Addons/add-addons/add-addons.component';
import {ViewAddonsCategoryComponent} from '../../pages/Products/Addons/view-addons-category/view-addons-category.component';
import {ViewAddonsComponent} from '../../pages/Products/Addons/view-addons/view-addons.component';
import {ViewOrderComponent} from '../../pages/Orders/view-order/view-order.component';
import {AddPromocodeComponent} from '../../pages/Promocode/add-promocode/add-promocode.component';
import {ViewPromocodeComponent} from '../../pages/Promocode/view-promocode/view-promocode.component';
import {EditAddonsComponent} from '../../pages/Products/Addons/edit-addons/edit-addons.component';
import {CompanyProfileComponent} from '../../pages/Company/company-profile/company-profile.component';

export const AdminLayoutRoutes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'user-profile', component: UserProfileComponent},
  {path: 'tables', component: TablesComponent},
  {path: 'icons', component: IconsComponent},
  {path: 'maps', component: MapsComponent},
  {path: 'addBranch', component: AddBranchComponent},
  {path: 'addManager', component: AddManagerComponent},
  {path: 'addMainLocation', component: AddMainLocationComponent},
  {path: 'addSubLocation', component: AddSubLocationComponent},
  {path: 'viewSubLocation', component: ViewSubLocationComponent},
  {path: 'viewMainLocation', component: ViewMainLocationComponent},
  {path: 'addCategory', component: AddCategoryComponent},
  {path: 'viewCategory', component: ViewCategoryComponent},
  {path: 'viewUnit', component: ViewUnitComponent},
  {path: 'addUnit', component: AddUnitComponent},
  {path: 'viewBranch', component: ViewBranchComponent},
  {path: 'addProduct', component: AddProductComponent},
  {path: 'listProducts', component: ListProductComponent},
  {path: 'addAddons', component: AddAddonsComponent},
  {path: 'addAddonsCategory', component: AddAddonsCategoryComponent},
  {path: 'viewAddonsCategory', component: ViewAddonsCategoryComponent},
  {path: 'viewAddons', component: ViewAddonsComponent},
  {path: 'viewOrder', component: ViewOrderComponent},
  {path: 'addPromocode', component: AddPromocodeComponent},
  {path: 'viewPromocode', component: ViewPromocodeComponent},
  {path: 'editAddons', component: EditAddonsComponent},
  {path: 'Company-Profile', component: CompanyProfileComponent},

];
