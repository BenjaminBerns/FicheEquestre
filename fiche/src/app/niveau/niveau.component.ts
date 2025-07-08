import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Notation, NotationsService } from '../services/notations.service';
import { NiveauService } from '../services/niveau.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Epreuve, EpreuvesService } from '../services/epreuves.service';
import { Cavalier, CavaliersService } from '../services/cavaliers.service';
import { Observable, ObservableNotification, Subscribable, Subscription } from 'rxjs';

@Component({
  selector: 'app-niveau',
  imports: [FormsModule, NgFor],
  templateUrl: './niveau.component.html',
  styleUrl: './niveau.component.css'
})
export class NiveauComponent {

  notations: Notation[] = [];
  competitionId: number = 0;
  epreuves: Epreuve[] = [];
  tousLesNiveaux: any[] = [];
  ListCavaliers: any[] | null = null;

  constructor(
    private niveau: NiveauService,
    private route: ActivatedRoute,
    private service: EpreuvesService,
    private router: Router,
    private cavalier: CavaliersService
  ) { }

  ngOnInit(): void {
    this.competitionId = Number(this.route.snapshot.paramMap.get('id'));
    this.cavalier.getAllCavaliers().subscribe(data => {
      this.ListCavaliers = data.data;
    console.log('getAllCavaliers: ', this.ListCavaliers);
    })
    this.loadEpreuves();
  }

  // ngOnInit(): void{
  //   this.notations = this.niveau.getAllNotations()
  // }

  loadEpreuves(): void {
    this.service.getAllEpreuvesbyCompetitionId(this.competitionId).subscribe(res => {
      this.epreuves = res.data;
      console.log('EPREUVES REAL : ', this.epreuves, 'NIVEAU', res.data[0].niveau_epreuves);

      for (let i = 0; i < res.data[0].niveau_epreuves.length; i++) {
        this.tousLesNiveaux.push(res.data[0].niveau_epreuves[i].niveau);
        this.niveau.setNiveau(this.tousLesNiveaux);
      }
      console.log('Liste de tous les niveaux :', this.tousLesNiveaux);
    });
  } 

  AddCavalier(): void{
    
  }

  UpdateCavalier(id: number): void{
    this.router.navigate(['/competitions', id, 'epreuves']);
  }
}
