import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AddBranchComponent } from './pages/Branch/add-branch/add-branch.component';
import { AddManagerComponent } from './pages/Manager/add-manager/add-manager.component';
import { AddMainLocationComponent } from './pages/Location/add-main-location/add-main-location.component';
import {HttpModule} from '@angular/http';
import { AddSubLocationComponent } from './pages/Location/add-sub-location/add-sub-location.component';
import { ViewMainLocationComponent } from './pages/Location/view-main-location/view-main-location.component';
import { ViewSubLocationComponent } from './pages/Location/view-sub-location/view-sub-location.component';
import {TokenInterceptorService} from './Service/Authentication/Token/token-interceptor.service';
import {ToastrModule} from 'ngx-toastr';
import { ViewBranchComponent } from './pages/Branch/view-branch/view-branch.component';
import { AddCategoryComponent } from './pages/Category & Unit/add-category/add-category.component';
import { AddUnitComponent } from './pages/Category & Unit/add-unit/add-unit.component';
import {NgxSpinnerModule} from 'ngx-spinner';
import {NgxPaginationModule} from 'ngx-pagination';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {ModalModule} from 'ngx-bootstrap/modal';
import {ClipboardModule} from 'ngx-clipboard';
import { ViewCategoryComponent } from './pages/Category & Unit/view-category/view-category.component';


// @ts-ignore
@NgModule({
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        ComponentsModule,
        NgbModule,
        RouterModule,
        AppRoutingModule,
        ReactiveFormsModule,
        ToastrModule.forRoot(),
        HttpModule,
        NgxSpinnerModule,
        NgxPaginationModule,
        Ng2SearchPipeModule,
        ModalModule.forRoot(),
        ClipboardModule,
    ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    AddBranchComponent,
    AddManagerComponent,
    AddMainLocationComponent,
    AddSubLocationComponent,
    ViewMainLocationComponent,
    ViewSubLocationComponent,
    ViewBranchComponent,
    AddCategoryComponent,
    AddUnitComponent,
    ViewCategoryComponent
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
