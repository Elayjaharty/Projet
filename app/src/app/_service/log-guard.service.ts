import { Injectable } from "@angular/core";
import { CanActivate, Router } from '@angular/router';
import { AuthentificationService } from './authentification.service';


@Injectable()
export class LoggedGuardService implements CanActivate {
    
    public route = localStorage.getItem('direction')

    constructor (private auth: AuthentificationService, private router: Router) {}

    canActivate () {
        if (this.auth.isLoggedIn()) {
            console.log(this.route);
            
            // window.location.pathname = (`/${this.route}`);
            return false;
        }
        return true;
    }
}