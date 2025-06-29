import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CompetitionService, Epreuve } from '../../services/competition.service';

@Component({
  selector: 'app-epreuves',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './epreuves.component.html',
  styleUrls: ['./epreuves.component.css']
})
export class EpreuvesComponent implements OnInit {
  epreuves: Epreuve[] = [];
  competitionId: number = 0;

  constructor(private route: ActivatedRoute, private service: CompetitionService) {}

  ngOnInit(): void {
    this.competitionId = Number(this.route.snapshot.paramMap.get('id'));

    this.service.getEpreuvesByCompetitionId(this.competitionId).subscribe(data => {
      this.epreuves = data;
    });
  }
}
