import { Component, NgIterable } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Competition, CompetitionService } from '../services/competition.service';
import { Epreuve, EpreuvesService } from '../services/epreuves.service';
import { FormsModule, NgModel } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { async, Observable } from 'rxjs';
import { NgFor, NgIf } from '@angular/common';
import { Juge, JugesService } from '../services/juges.service';

@Component({
  selector: 'app-competition-juge',
  imports: [NgFor, FormsModule],
  templateUrl: './competition-juge.component.html',
  styleUrl: './competition-juge.component.css'
})
export class CompetitionJugeComponent {

  constructor(
    private route: ActivatedRoute,
    private CompetitionService: CompetitionService,
    private EpreuveService: EpreuvesService,
    private jugesServices: JugesService,
    private router: Router,
    private http: HttpClient
  ) { }

  AllJuges: Juge[] = [];
  juge_id: number = 0;

  ngOnInit(): void {
    this.getAllJuge();
  }

  addNew(): void{

  }

  getAllJuge() {
    this.jugesServices.getAllJuges().subscribe({
      next: (data) => {
        this.AllJuges = Array.isArray(data) ? data : (data.data || []);
        console.log('All juges récupérer : ', this.AllJuges);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des juges :', error);
        this.AllJuges = [];
      }
    });
  }
}
