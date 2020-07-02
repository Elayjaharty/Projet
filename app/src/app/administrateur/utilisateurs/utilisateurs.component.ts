import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from 'src/app/_service/uitlisateur/utilisateur.service';

@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.css']
})
export class UtilisateursComponent implements OnInit {

  public utilisateur: any;

  constructor(private uService: UtilisateurService) {}

  ngOnInit(): void {
    this.uService.utilisateurs().subscribe(
      utilisateurs => {
        this.utilisateur = utilisateurs;
      }
    )
  }

}
