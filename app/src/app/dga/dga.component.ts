import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../_service/authentification.service';
import { UtilisateurService } from '../_service/uitlisateur/utilisateur.service';
import { Utilisateur } from '../_model/utilisateur';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-dga',
  templateUrl: './dga.component.html',
  styleUrls: ['./dga.component.css']
})
export class DgaComponent implements OnInit {

  public direction = 'DGA';
  public infos: Utilisateur;
  public prenom: any;
  public nom: any;
  public profile: any;

  constructor(private auth: AuthentificationService, private UService: UtilisateurService, private router: Router, private route: ActivatedRoute) { }

  logOut () {
    this.auth.logout();
  }

  ngOnInit(): void {
    this.UService.profile().subscribe(
      user => {
        this.infos = user
        let dir =  localStorage.getItem('direction')
        if (this.direction == dir) {
          if (this.infos.admin === true) {
            this.router.navigate(['admin','dashboard'], {relativeTo: this.route});
          } else {
            this.router.navigate(['user','home'], {relativeTo: this.route});
          }
        } else {
          this.router.navigate([dir]);
        }

        this.prenom = this.infos.prenom;
        this.nom = this.infos.nom;
        if (this.infos.admin === true) {
          this.profile = 'administrateur';
        } else {
          this.profile = 'utilisateur'
        }
      },
      err => {
        console.error(err);
      }
    )
  }

  Profil (){
   if (this.infos.admin == true) {
    this.router.navigate(['admin','profile'], {relativeTo: this.route});     
   } else {
    this.router.navigate(['admin','profile'], {relativeTo: this.route});
   }
  }

}
