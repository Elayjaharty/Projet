import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { Utilisateur } from '../_model/utilisateur';

interface TokenReponse{
    token: string
}

export interface log {
    email: string
    mpd: string
    dir: number
}

@Injectable()
export class AuthentificationService {
    private token: string

    constructor(private http: HttpClient, private router: Router ) {}

    private saveToken (token: string) : void {
        localStorage.setItem('utilisateurToken', token);
        this.token = token;
    }

    private getToken () : string {
        if(!this.token) {
            this.token = localStorage.getItem('utilisateurToken');
        }
        return this.token;
    }

    public getUtilisateur(): Utilisateur {
        const token = this.getToken();
        let payload;
        if(token) {
            payload = token.split('.')[1];
            payload = window.atob(payload);
            return JSON.parse(payload);
        }else{
            return null;
        }
    }

    public isLoggedIn(): boolean {
        const utilisateur = this.getUtilisateur();
        if(utilisateur) {
            console.log(utilisateur);
            return utilisateur.exp > Date.now() / 1000;
        }else{
            return false;
        }
    }
    
    public login (identite: log): Observable<any> {
        const base = this.http.post(`${environment.api}/login/`, identite);

        const requette = base.pipe(
            map((data: TokenReponse) => {
                if(data.token) {
                    this.saveToken(data.token);
                }
                return data;
            })
        )

        return requette;
    }

    public logout(): void {
        this.token = '';
        window.localStorage.removeItem('utilisateurToken');
        window.localStorage.removeItem('direction');
        window.localStorage.setItem('direction', null)
        this.router.navigateByUrl('/welcome');
    }

}