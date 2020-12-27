import {Component, ElementRef, OnInit, ViewEncapsulation} from '@angular/core';
import {ROUTES} from '../sidebar/sidebar.component';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {AuthService} from '../../Service/Authentication/auth.service';
import {MasterService} from '../../Service/Database/master.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {ToastService} from '../../Service/Alert/toast.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss',
    '../../../assets/CSS/toastr.css'],
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  companyData: any = [];
  public userData: any = [{name: ''}];

  constructor(location: Location,
              public masterService: MasterService,
              public toastService: ToastService,
              private element: ElementRef, private router: Router, public authService: AuthService
  ) {
    this.location = location;
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    this.userData = JSON.parse(localStorage.getItem('UserData'));
  }

  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(1);
    }

    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return 'Dashboard';
  }

  logout() {
    this.authService.setToLoggedOut();
    this.authService.clearUserDetails();
    this.router.navigate(['/login']);
  }

  navigateToSite() {
    this.masterService.fetchCompanyDetails().subscribe(res => {
      let Resulset;
      Resulset = res;
      if (Resulset.Status) {
        if (Resulset.companies.length > 0) {
          // has attached company
          const slug = Resulset.companies[0].slug_name;
          this.router.navigate([]).then(result => {
            window.open(`https://www.eshopy.live/${slug}`, '_blank');
          });

        } else {
          this.toastService.showError('No Company attached', 'Oops !');

        }
      } else  {
        this.toastService.showError('Failed to fetch company details', 'Oops !');

      }
    }),
      // tslint:disable-next-line:no-unused-expression
      (error: HttpErrorResponse) => {
        if (error.error instanceof Error) {
          // console.log('An error occurred:', error.error.message);
          this.toastService.showError('An error occcured', 'Oops !');
        } else {
          this.toastService.showError('An error occcured', 'Oops !');
          // console.log('Backend resturned status code: ', error.status);
          // console.log('Response body:', error.error);
        }
      };
  }
}
