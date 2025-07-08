import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../environnements/environnements';
import { NiveauService } from './niveau.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EpreuvesService } from './epreuves.service';
import { CavaliersService } from './cavaliers.service';
import { HttpClient } from '@angular/common/http';

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
  notation: Notation[] = [];
  constructor(
    private niveau: NiveauService,
    private route: ActivatedRoute,
    private service: EpreuvesService,
    private router: Router,
    private cavalier: CavaliersService,
    private http: HttpClient
  ) { }

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

  // getAllNotations(): Notation[] {
  //   return this.notation;
  // }

  setNotations(notations: Notation[]): void{
    this.notation = notations;
  }

  getNotationsByEpreuveId(epreuveId: number): Observable<any> {
    const url = `${environment.apiUrl}/notation/getNotationsOfEpreuve`;
    const params = { epreuve_id: epreuveId };
    return this.http.get(url, { params });
  }
}
