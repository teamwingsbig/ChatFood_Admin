import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
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
       HttpModule
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
    ViewSubLocationComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
