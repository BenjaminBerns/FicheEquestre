import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CompetitionService, Competition } from '../../services/competition.service';

@Component({
  selector: 'app-competition-list',
  templateUrl: './list.component.html',
  imports:[ CommonModule]
})
export class ListComponent implements OnInit {
  competitions: Competition[] = [];

  constructor(private competitionService: CompetitionService, private router: Router) {}

  ngOnInit(): void {
    this.competitionService.getCompetitions().subscribe(data => {
      this.competitions = data;
    });
  }

  voirDetails(comp: Competition): void {
  this.router.navigate(['/competitions', comp.id, 'epreuves']);
  }

  supprimerCompetition(id: number): void {
    console.log('Suppression de la compétition avec ID :', id);
    // plus tard : confirmation + appel à l'API
  }
}
