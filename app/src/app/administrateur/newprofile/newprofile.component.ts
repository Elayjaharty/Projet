import { Component, OnInit } from '@angular/core';
import { donnee, UtilisateurService } from 'src/app/_service/uitlisateur/utilisateur.service';

@Component({
  selector: 'app-newprofile',
  templateUrl: './newprofile.component.html',
  styleUrls: ['./newprofile.component.css']
})
export class NewprofileComponent implements OnInit {

  public verMpd: String;
  type: string;
  public direction = localStorage.getItem('direction');

  info: donnee = {
    id: null,
    IM: null,
    nom: '',
    prenom: '',
    email:  '',
    tel: '',
    mpd: '',
    fonction: '',
    admin: false,
    dir: null 
  }

  constructor(private uService: UtilisateurService) { }

  ngOnInit(): void {
  }

  OnSubmit() {
    if (this.direction == 'DGA') {
      this.info.dir = 1;
    } else {
      if (this.direction == 'DGE') {
        this.info.dir = 2;
      } else {
        if (this.direction == 'DGPA') {
          this.info.dir = 3;
        }
      }
    }
    console.log(this.direction);
    if (this.type == "Administrateur") {
      this.info.admin = true;
    }
    if (this.info.mpd == this.verMpd) {
      console.log(this.info);
      this.uService.registre(this.info).subscribe(
         (data) =>{
          console.log(data);
         },
         err => {
          console.log(err.status);
          console.log(err.error);
         }
      )
    } else {
      const err = 'Les mots de passe entrés sont differents!';
      console.log(err);
    }
  }

}
