import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';


export interface donnee {
    id: number
    IM: number
    nom: string
    prenom: string
    email: string 
    tel: string
    mpd: string
    fonction: string
    admin: boolean 
    dir: number  
}

@Injectable()
export class UtilisateurService {

    constructor(private http: HttpClient) {}

    private Token = localStorage.getItem('utilisateurToken');

    public registre (data: donnee): Observable<any> {
        return this.http.post(`${environment.api}/registre/`, data);
    }

    public profile (): Observable<any> {
        return this.http.get(`${environment.api}/utilisateur/in/`, {
            headers: { Authorization: `${this.Token}` }
        });
    }

    public utilisateurs (): Observable<any> {
        return this.http.get(`${environment.api}/utilisateurs/`);
    }
    
}