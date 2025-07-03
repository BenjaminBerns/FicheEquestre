import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Notation {
  notation_id: number;
  contrat_notation: number;
  allure_notation: number;
  penalite_notation: number;
  style_notation: number;
  total: number;
  cavalier_id: number;
  epreuve_id: number;
  niveau_id: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotationsService {
  private notations: Notation[] = [
    {
      notation_id: 1,
      contrat_notation: 8,
      allure_notation: 7,
      penalite_notation: 2,
      style_notation: 9,
      total: 26,
      cavalier_id: 1,
      epreuve_id: 2,
      niveau_id: 1
    },
    {
      notation_id: 2,
      contrat_notation: 9,
      allure_notation: 6,
      penalite_notation: 1,
      style_notation: 8,
      total: 26,
      cavalier_id: 2,
      epreuve_id: 2,
      niveau_id: 1
    },
    {
      notation_id: 3,
      contrat_notation: 7,
      allure_notation: 8,
      penalite_notation: 0,
      style_notation: 9,
      total: 24,
      cavalier_id: 3,
      epreuve_id: 1,
      niveau_id: 2
    }
  ];

  getAllNotations(): Observable<Notation[]> {
    return of(this.notations);
  }

  getNotationsByEpreuveId(epreuveId: number): Observable<Notation[]> {
    return of(this.notations.filter(n => n.epreuve_id === epreuveId));
  }
}
