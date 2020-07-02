import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from '../_service/uitlisateur/utilisateur.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public modifdonnee: null;
  public modifmdp: null;
  public compte: any;
  public numero: any;

  public infos = {
    id: 0,
    IM: 0,
    nom: '',
    prenom: '',
    email:  '',
    tel: '',
    fonction: '',
    admin: false    
};

  public direction = localStorage.getItem('direction');

  constructor (private UService: UtilisateurService) {}

  ngOnInit(): void {
    this.UService.profile().subscribe(
      user => {
        this.infos = user;
        if (this.infos.admin === true){
          this.compte = 'administrateur';
        } else {
          this.compte = 'utilistateur';
        }
        if (this.infos.tel === null){
          this.numero = 'pas definit';
        } else {
          this.numero = this.infos.tel;
        }
      },
      err => {
        console.error(err);
      }
    )    
  }
}
