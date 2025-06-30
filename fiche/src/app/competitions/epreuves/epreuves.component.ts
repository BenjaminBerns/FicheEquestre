import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CompetitionService, Epreuve } from '../../services/competition.service';
import { EpreuvesService } from '../../services/epreuves.service';

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

  constructor(
    private route: ActivatedRoute,
    private service: EpreuvesService,
    private CompetitionService: CompetitionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.competitionId = Number(this.route.snapshot.paramMap.get('id'));
    console.log('ID Compétition récupéré :', this.competitionId);

    this.service.getAllEpreuves(this.competitionId).subscribe(data => {
      console.log('Données brutes API :', data);
      
      this.epreuves = data.data;
      console.log('Epreuves affectées :', this.epreuves);
    });
  }

  DetailsPopUp(epreuve_id: number) {
    this.router.navigate(['/pop-up', epreuve_id]);
  }

  supprimerEpreuve(epreuve_id: number) {
    console.log('Suppression de l\'épreuve : ' + epreuve_id);
  }

}
