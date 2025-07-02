import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Epreuve {
  epreuve_id: number;
  competition_id: number;
  juge_id: number;
  notation_type: number;
  epreuve_name: string;
  epreuve_description: string;
  epreuve_materiels: string;
}

@Injectable({
  providedIn: 'root'
})
export class EpreuvesService {

  selectedEpreuve: Partial<Epreuve> = {};
  epreuveDetail: Epreuve | null = null;
  isEditing = false;


  private fakeEpreuves: Epreuve[] = [
    {
      epreuve_id: 1,
      competition_id: 1,
      juge_id: 10,
      notation_type: 1,
      epreuve_name: 'Saut d’obstacles',
      epreuve_description: 'Épreuve de saut d’obstacles classique',
      epreuve_materiels: 'Barres, plots, chandeliers'
    },
    {
      epreuve_id: 2,
      competition_id: 1,
      juge_id: 11,
      notation_type: 2,
      epreuve_name: 'Dressage',
      epreuve_description: 'Figures imposées en manège',
      epreuve_materiels: 'Lettres de dressage, barres au sol'
    },
    {
      epreuve_id: 3,
      competition_id: 2,
      juge_id: 12,
      notation_type: 1,
      epreuve_name: 'Concours complet',
      epreuve_description: 'Dressage + Saut + Cross',
      epreuve_materiels: 'Obstacles, terrain, manège'
    }
  ];

  constructor(private http: HttpClient) { }

  getAllEpreuves(id: number): Observable<any> {
    const url = 'http://prod-project-32/epreuve/getAllEpreuvesOfCompetition';
    const params = { id: id };
    console.log(id);
    return this.http.get(url, { params });
  }

  getEpreuveById(id: number): Observable<Epreuve | null> {
    const epreuve = this.fakeEpreuves.find(e => e.epreuve_id === id);
    return of(epreuve || null);
  }

  getEpreuvesByCompetitionId(competitionId: number): Observable<Epreuve[]> {
    const epreuves = this.fakeEpreuves.filter(e => e.competition_id === competitionId);
    return of(epreuves);
  }

  addEpreuve(epreuve: Epreuve): Observable<Epreuve> {
    this.fakeEpreuves.push(epreuve);
    return of(epreuve);
  }

  updateEpreuve(epreuve: Epreuve): Observable<Epreuve | null> {
    const index = this.fakeEpreuves.findIndex(e => e.epreuve_id === epreuve.epreuve_id);
    if (index !== -1) {
      this.fakeEpreuves[index] = epreuve;
      return of(epreuve);
    }
    return of(null);
  }

  deleteEpreuve(epreuve_id: number): Observable<boolean> {
    const index = this.fakeEpreuves.findIndex(e => e.epreuve_id === epreuve_id);
    if (index !== -1) {
      this.fakeEpreuves.splice(index, 1);
      return of(true);
    }
    return of(false);
  }

  
}
