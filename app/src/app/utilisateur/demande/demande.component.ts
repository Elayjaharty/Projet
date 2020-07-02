import { Component, OnInit } from '@angular/core';
import { demande, DemandeService } from 'src/app/_service/demande/demande.service';
import { UtilisateurService } from 'src/app/_service/uitlisateur/utilisateur.service';

@Component({
  selector: 'app-demande',
  templateUrl: './demande.component.html',
  styleUrls: ['./demande.component.css']
})
export class DemandeComponent implements OnInit {

  public ref: string;
  public data : any;

  donnee: demande = {
    titre: '',
    contenue: '',
    refDm: ''
  }

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

  constructor( private UService: UtilisateurService,private dmService: DemandeService) { }

  ngOnInit(): void {
    this.UService.profile().subscribe(
      user => {
        this.infos = user;
        this.ref = 'DM-'+Date.now()+'-'+this.infos.IM;
        this.donnee.refDm = this.ref;
      },
      err => {
        console.error(err);
      }
    )    
  }

  OnSubmit() {
    this.dmService.evoiDemande(this.donnee).subscribe(
      (response) => {
        console.log(response);    
        this.UService.profile().subscribe(
          user => {
            this.infos = user;
            this.ref = 'DM-'+Date.now()+'-'+this.infos.IM;
            this.donnee.titre = "";
            this.donnee.contenue = "";
            this.donnee.refDm = this.ref;
          },
          err => {
            console.error(err);
          }
        )  
        this.data = response;
      },
      err => {
        console.error(err);
      }
    )
  }
}
