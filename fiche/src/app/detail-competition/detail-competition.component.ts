import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EpreuvesService } from '../services/epreuves.service';
import { CompetitionService } from '../services/competition.service';

@Component({
  selector: 'app-detail-competition',
  imports: [],
  templateUrl: './detail-competition.component.html',
  styleUrl: './detail-competition.component.css'
})
export class DetailCompetitionComponent {

  constructor(
    private route: ActivatedRoute,
    private service: EpreuvesService,
    private CompetitionService: CompetitionService,
    private router: Router
  ) { }
  
  id: string | null = null;

  competition_id: number | null = null;
  competition_nom: string = '';
  competition_date: string | null = null;
  competition_location: string = '';
  competition_statut: number | null = null;
  created_at: string | null = null;
  created_by: number | null = null;
  updatedData: any = null;
  
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    const idNumber = this.id !== null ? Number(this.id) : null;
    if (idNumber !== null && !isNaN(idNumber)) {
      this.CompetitionService.getCompetitionById(idNumber).subscribe(data => {
        console.log(data);
        // Utilisation de l'interface Competition importée depuis le service
        const competition: import('../services/competition.service').Competition = {
          competition_id: data.competition_id,
          competition_nom: data.competition_nom,
          competition_date: data.competition_date
            ? (() => {
                const dateObj = new Date(data.competition_date);
                const year = dateObj.getFullYear();
                const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
                const day = dateObj.getDate().toString().padStart(2, '0');
                return `${year}-${month}-${day}`;
              })()
            : null,
          competition_location: data.competition_location,
          competition_statut: data.competition_statut,
          created_at: data.created_at,
          created_by: data.created_by
        };

        // Mise à jour des propriétés du composant
        this.competition_id = competition.competition_id;
        this.competition_nom = competition.competition_nom;
        this.competition_date = competition.competition_date;
        this.competition_location = competition.competition_location;
        this.competition_statut = competition.competition_statut;
        this.created_at = competition.created_at;
        this.created_by = competition.created_by;

        // Remplace updatedData par un objet de type Competition
        this.updatedData = competition;
      });
    } else {
      console.error("L'identifiant de la compétition est invalide ou manquant.");
    }
  }

  updateCompetition() {
    this.CompetitionService.UpdateCompetition(this.updatedData).subscribe(data => {
      console.log(data);
    });
  }
}