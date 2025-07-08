import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EpreuvesService, Epreuve } from '../../services/epreuves.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotationsService } from '../../services/notations.service';
import { Niveau, NiveauService } from '../../services/niveau.service';

@Component({
  selector: 'app-epreuves',
  templateUrl: './epreuves.component.html',
  styleUrls: ['./epreuves.component.css'],
  imports: [FormsModule, NgIf, NgFor],
})
export class EpreuvesComponent implements OnInit {
  competitionId: number = 0;
  id_juge: string | null = null;
  
  epreuves: Epreuve[] = [];
  selectedEpreuve: Partial<Epreuve> = {};
  epreuveDetail: Epreuve | null = null;
  isEditing = false;

  constructor(
    private route: ActivatedRoute,
    private service: EpreuvesService,
    private router: Router,
    private niveau: NiveauService,
  ) {}

  ngOnInit(): void {
    this.competitionId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadEpreuves();
  }
  
  DetailsPopUp(epreuve_id: number, juge_id: number) {
    this.router.navigate(['/pop-up/epreuve', epreuve_id, 'juge', juge_id]);
  }

  async DeleteEpreuve(epreuve_id: number) {
    this.service.deleteEpreuve(epreuve_id);
    await new Promise(resolve => setTimeout(resolve, 1000));
    this.router.navigate(['/detail-epreuves/', this.competitionId]);
  }

  Notation(epreuve_id: number,) {
    this.router.navigate(['notations/epreuve', epreuve_id]);
  }

  ListNiveaux() {
    this.router.navigate(['/niveau', this.competitionId]);
  }

  RedirectAdd() {
    this.router.navigate(['/CreateEpreuve', this.competitionId]);
  }

  loadEpreuves(): void {
    this.service.getAllEpreuvesbyCompetitionId(this.competitionId).subscribe(res => {
      this.epreuves = res.data;
      console.log('EPREUVES REAL : ', this.epreuves, 'NIVEAU', res.data[0].niveau_epreuves);

      // Récupérer la liste de tous les niveaux présents dans toutes les épreuves
      const tousLesNiveaux: any[] = [];

      for (let i = 0; i < res.data[0].niveau_epreuves.length; i++) {
        tousLesNiveaux.push(res.data[0].niveau_epreuves[i].niveau);
        this.niveau.setNiveau(tousLesNiveaux);
      }
      console.log('Liste de tous les niveaux :', tousLesNiveaux);
    });
  }

  getEpreuveDetails(id: number): void {
    this.service.getEpreuveById(id).subscribe(data => {
      this.epreuveDetail = data;
    });
  }

  addEpreuve(): void {
    const newEpreuve: Epreuve = {
      ...this.selectedEpreuve,
      competition_id: this.competitionId,
      epreuve_id: Date.now()
    } as Epreuve;

    this.service.addEpreuve(newEpreuve).subscribe(() => {
      this.epreuves.push(newEpreuve);
      this.selectedEpreuve = {};
    });
  }

  editEpreuve(epreuve: Epreuve): void {
    this.selectedEpreuve = { ...epreuve };
    this.isEditing = true;
  }

  updateEpreuve(): void {
    if (!this.selectedEpreuve.epreuve_id) return;

    this.service.updateEpreuve(this.selectedEpreuve as Epreuve).subscribe(updated => {
      if (updated) {
        const index = this.epreuves.findIndex(e => e.epreuve_id === updated.epreuve_id);
        if (index !== -1) {
          this.epreuves[index] = updated;
        }
      }
      this.cancelEdit();
    });
  }

  deleteEpreuve(epreuve_id: number): void {
    this.service.deleteEpreuve(epreuve_id).subscribe(success => {
      if (success) {
        this.epreuves = this.epreuves.filter(e => e.epreuve_id !== epreuve_id);
      }
    });
  }

  cancelEdit(): void {
    this.selectedEpreuve = {};
    this.isEditing = false;
  }
}
