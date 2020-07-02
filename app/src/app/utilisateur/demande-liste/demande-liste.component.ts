import { Component, OnInit } from '@angular/core';
import { DemandeService } from 'src/app/_service/demande/demande.service';

@Component({
  selector: 'app-demande-liste',
  templateUrl: './demande-liste.component.html',
  styleUrls: ['./demande-liste.component.css']
})
export class DemandeListeComponent implements OnInit {

  public demande: any; 

  constructor(private dmService: DemandeService) { }

  ngOnInit(): void {
    this.dmService.demande().subscribe(
      demandes => {
        this.demande = demandes;
      },
      err => {
        console.log(err);
      }
    )
  }

}
