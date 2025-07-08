import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { JugesService, Juge } from '../services/juges.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-juge',
  imports: [NgIf, RouterLink, NgFor],
  templateUrl: './juge.component.html',
  styleUrl: './juge.component.css'
})
export class JugeComponent {

  juges: Juge| null = null;
  id: number = 0;
  jugesCompetiton: Juge[] = [];
  juge_id: string | null = null;
  competiton_id: number | null = null;
  status: string = '';
  isJugeExist: boolean = false;

  
  // competition_juge
  // competition_id
  // juge_id
  // qr-code/competition/:id_competition/juge/:id_juge

  constructor(
    private jugeService: JugesService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Récupérer les paramètres selon la structure de l'URL
    // qr-code/competition/:id_competition/juge/:id_juge
    this.juge_id = this.route.snapshot.paramMap.get('id');
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    console.log('ID Compétition: ', this.id);
    console.log('ID Juge: ', this.juge_id);
  
    // Récupérer Juges par identifiant avec gestion des succès et erreurs
    if (this.router.url.includes('epreuve')) {
      this.status = 'epreuve';
      this.jugeService.getJugesById(this.id).subscribe({
        next: data => {
          this.juges = data.data;
          console.log('Succès récupération du juge :', this.juges);
        },
        error: err => {
          console.log('Erreur lors de la récupération du juge :', err);
        }
      });
      if (this.juges === null) {
        this.isJugeExist = true;
      }
    } else if (this.router.url.includes('competition')) {
      this.status = 'competition';
      this.jugeService.getJugesByCompetition(this.id).subscribe({
        next: data => {
          this.jugesCompetiton = data.data;
          console.log('Succès récupération des juges de la compétition :', this.jugesCompetiton);
        },
        error: err => {
          console.log('Erreur lors de la récupération des juges de la compétition :', err);
        }
      });
      if (this.jugesCompetiton === null) {
        this.isJugeExist = true;
      }
    } else {
      this.status = 'detail';
      // Récupérer competition_id avec gestion des succès et erreurs
      this.jugeService.getCompetitionByJuge(Number(this.juge_id)).subscribe({
        next: data => {
          this.competiton_id = data.data[0].competition_id;
          console.log('Succès récupération competition_id :', this.competiton_id);
        },
        error: err => {
          console.log('Erreur lors de la récupération du competition_id :', err);
        }
      });
    }
  }

  RedirectAdd(): void{
    // Redirige vers la route addJuges/:id
    this.router.navigate(['addJuges', this.juge_id]);
  }
}
