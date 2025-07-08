import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CompetitionService, Competition } from '../../services/competition.service';

@Component({
  selector: 'app-competition-list',
  styleUrl: './list.component.css',
  templateUrl: './list.component.html',
  imports:[ CommonModule, RouterLink]
})
export class ListComponent implements OnInit {
  
  competitions: Competition[] = [];

  constructor(private competitionService: CompetitionService, private router: Router) {}

  ngOnInit(): void {
    this.competitionService.getAllCompetitions().subscribe(data => {
      this.competitions = data;
      console.log(data);
    });
  }

  voirDetails(comp: Competition): void {
  this.router.navigate(['/competitions', comp.competition_id, 'epreuves']);
  }

  DetailsPopUp(epreuve_id: number) {
    this.router.navigate(['/pop-up/competition', epreuve_id]);
  }

  async DeleteCompetition(competition_id: number) {
    this.competitionService.deleteCompetition(competition_id).subscribe(data => {
      console.log('DATA SUPPRIME COMPETITION', data);
    });
    await new Promise(resolve => setTimeout(resolve, 1000));
    this.router.navigate(['/listecompetitions']);
  }
}
