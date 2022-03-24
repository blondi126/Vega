import { Component, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';

@Component({
    selector: 'app-auth-button',
    template: `
    <ng-container *ngIf="auth.isAuthenticated$ | async; else loggedOut">
     <li class="nav-item"  [routerLinkActive]="['link-active']" [routerLinkActiveOptions]="{ exact: true }">
         <a class="nav-link text-dark" (click)="auth.logout({ returnTo: document.location.origin })">
               Log out
          </a>
     </li>
    </ng-container>

    <ng-template #loggedOut>
        <li class="nav-item"  [routerLinkActive]="['link-active']" [routerLinkActiveOptions]="{ exact: true }">
            <a class="nav-link text-dark" (click)="auth.loginWithRedirect()">
                Log in
            </a>
        </li>
    </ng-template>
    `,
    styles: [],
})
export class AuthButtonComponent {
    constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthService) { 
    }
}