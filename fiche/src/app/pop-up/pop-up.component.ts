import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EpreuvesService } from '../services/epreuves.service';
import { Competition, CompetitionService, Epreuve } from '../services/competition.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Juge, JugesService } from '../services/juges.service';

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
    private router: Router,
    private juge: JugesService
  ) { }
  
  id: string | null = null;
  juge_id: string | null = null;
  isEpreuve: boolean | null = null;
  isNb: boolean | null = null;
  isIDc: boolean | null = null;
  NbEp: number = 0;
  NbJuge: number = 0;
  NbCompet: number = 0;
  isNotation: boolean = false;
  nbj: number = 0;
  // SetJuges: boolean = false;
  id_competition: number = 0;
  epreuve_id: number = 0;
  competition: Competition[] = [];
  epreuves: Epreuve[] = [];
  juges: Juge[] = [];

  ngOnInit(): void {
    this.juge.getAllJuges().subscribe({
      next: (data) => {
        this.juges = data.data;
        console.log('this.juges', this.juges);
        this.nbj = this.juges.length;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des juges :', error);
        this.juges = [];
      }
    });
    console.log('NBJ',this.nbj);
    
    this.CompetitionService.getAllCompetitions().subscribe({
      next: (data) => {
        this.competition = data;
        console.log(this.competition);
        for (let i = 0; i < this.competition.length; i++) {
          console.log(i);
          this.service.getAllEpreuvesbyCompetitionId(this.competition[i].competition_id).subscribe({
            next: (data) => {
              this.epreuves = this.epreuves.concat(data);
              console.log('Épreuves pour la compétition', this.competition[i].competition_id, ':', data);
            },
            error: (error) => {
              console.error('Erreur lors de la récupération des épreuves pour la compétition', this.competition[i].competition_id, ':', error);
            }
          });
        }
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
    } if (this.router.url.includes('notation')) {
      this.isNotation = true;
    }
    // if (this.router.url.includes('SetJuges')) {
    //   this.SetJuges = true;
    // }
  }

  testJugeId(): void{
    this.juge_id = this.route.snapshot.paramMap.get('juge_id');
    console.log(this.juge_id);
  }
}
