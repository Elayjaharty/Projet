import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

export interface demande {
    titre: string
    contenue: string
    refDm: string
}

@Injectable()
export class DemandeService{

    constructor (private http: HttpClient) {}

    private Token = localStorage.getItem('utilisateurToken');

    public demande (): Observable<any> {
        return this.http.get(`${environment.api}/utilisateur/demande/liste/`, {
            headers: { Authorization: `${this.Token}` }
        });
    }

    public demandelist (): Observable<any> {
        return this.http.get(`${environment.api}/demande/liste`);
    }

    public evoiDemande (donnee: demande): Observable<any> {
        return this.http.post(`${environment.api}/demande/nouveau/`, donnee, {
            headers: { Authorization: `${this.Token}` }}
        );
    }
}