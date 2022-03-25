import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  private roles: string[] = [];

  constructor(public auth: AuthService) {

      this.auth.getAccessTokenSilently().subscribe(token => {
        if (token) {
          var jwtHelper = new JwtHelperService();
          var decodedToken = jwtHelper.decodeToken(token);
          this.roles = decodedToken['https://vega.com/roles'];
        }
      });

  }

  ngOnInit(): void {
  }

  isExpanded = false;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  public isInRole(roleName: any) {
    return this.roles.indexOf(roleName) > -1;
  }
}
