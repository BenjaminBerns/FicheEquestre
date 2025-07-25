import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EpreuvesService } from '../services/epreuves.service';
import { Juge, JugesService } from '../services/juges.service';
import { Competition, CompetitionService, Epreuve } from '../services/competition.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-epreuve-editor',
  imports: [FormsModule, NgFor],
  templateUrl: './epreuve-editor.component.html',
  styleUrl: './epreuve-editor.component.css'
})
export class EpreuveEditorComponent {

constructor(
    private route: ActivatedRoute,
    private CompetitionService: CompetitionService,
    private EpreuveService: EpreuvesService,
    private jugesServices: JugesService,
    private router: Router,
    private http: HttpClient
  ) { }

  id_competition: number = 0;
  epreuve_id: number | null = null;
  epreuve_name: string = '';
  epreuve_description: string = '';
  epreuve_materiels: string = '';
  updatedDataE: any = null;
  notation_type: number | null = null;
  juge_id: number | null = null;
  epreuveData: any | null = null;
  AllJuges: Juge[] = [];

  newEpreuve: {
    epreuve_name: string;
    epreuve_date: string;
    epreuve_status: string;
  } = {
    epreuve_name: '',
    epreuve_date: '',
    epreuve_status: ''
  };

  ngOnInit(): void {

    this.getAllJuge();
    this.id_competition = Number(this.route.snapshot.paramMap.get('id'));

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

  async addEpreuve(): Promise<void> {

    console.log('Ajout nouvelle Epreuve');
    const epreuveToAdd = {
      epreuve_name: this.epreuve_name,
      epreuve_description: this.epreuve_description,
      epreuve_materiels: this.epreuve_materiels,
      competition_id: this.id_competition,
      notation_type: 1,
      juge_id: 1
    };
    console.log(epreuveToAdd);

      this.EpreuveService.createEpreuve(epreuveToAdd).subscribe({
        next: (response: any) => {
          console.log('Nouvelle épreuve ajoutée:', response);
        },
        error: (error: any) => {
          console.error('Erreur lors de l\'ajout de l\'épreuve:', error);
        }
      });
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    this.router.navigate(['/competitions', this.id_competition, 'epreuves']);
  }

}
