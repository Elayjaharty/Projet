import { Component, OnInit } from '@angular/core';
import { DemandeService } from 'src/app/_service/demande/demande.service';

@Component({
  selector: 'app-demandes',
  templateUrl: './demandes.component.html',
  styleUrls: ['./demandes.component.css']
})
export class DemandesComponent implements OnInit {

  public data: any;

  constructor(private demService: DemandeService) { }

  ngOnInit(): void {
    this.demService.demandelist().subscribe(
      (donnee) => {
        this.data = donnee;
      }
    )
  }

}
