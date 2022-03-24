import { Component, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';

@Component({
    selector: 'app-auth-button',
    template: `
    <ng-container *ngIf="auth.isAuthenticated$ | async; else loggedOut">
     <li class="nav-item"  [routerLinkActive]="['link-active']" [routerLinkActiveOptions]="{ exact: true }">
        <button class="btn btn-danger btn-block" (click)="auth.logout({ returnTo: document.location.origin })">
            Log out
         </button>
     </li>
    </ng-container>

    <ng-template #loggedOut>
        <li class="nav-item"  [routerLinkActive]="['link-active']" [routerLinkActiveOptions]="{ exact: true }">
            <button class="btn btn-primary btn-block" (click)="auth.loginWithRedirect()">
                Log in
            </button>
        </li>
    </ng-template>
    `,
    styles: [],
})
export class AuthButtonComponent {
    constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthService) { 
    }
}