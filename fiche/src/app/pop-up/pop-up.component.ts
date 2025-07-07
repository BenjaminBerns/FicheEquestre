import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EpreuvesService } from '../services/epreuves.service';
import { Competition, CompetitionService } from '../services/competition.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pop-up',
  imports: [RouterLink, NgIf, FormsModule, NgFor],
  templateUrl: './pop-up.component.html',
  styleUrl: './pop-up.component.css'
})
export class PopUpComponent {
  constructor(
    private CompetitionService: CompetitionService,
    private route: ActivatedRoute,
    private service: EpreuvesService,
    private router: Router
  ) { }
  
  id: string | null = null;
  juge_id: string | null = null;
  isEpreuve: boolean | null = null;
  isNb: boolean | null = null;
  isIDc: boolean | null = null;
  NbEp: number = 0;
  id_competition: number = 0;
  competition: Competition[] = [];

  ngOnInit(): void {
    this.CompetitionService.getAllCompetitions().subscribe({
      next: (data) => {
        this.competition = data;
        console.log(this.competition);
      }
    });
    this.id = this.route.snapshot.paramMap.get('id');
    this.isEpreuve = this.router.url.includes('epreuve');
    this.juge_id = this.route.snapshot.paramMap.get('juge_id');
    if (this.router.url.includes('SetNombresEpreuves')) {
      this.isNb = true;
    } else {
      this.isNb = false;
    }
    if (this.router.url.includes('SetCompetitionID')) {
      this.isIDc = true;
    } else {
      this.isIDc = false;
    }
  }

  testJugeId(): void{
    this.juge_id = this.route.snapshot.paramMap.get('juge_id');
    console.log(this.juge_id);
  }
}
