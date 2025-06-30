import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  constructor(private http: HttpClient) { }

  getAllEpreuves(id: number): Observable<any> {
    const url = 'http://prod-project-32/epreuve/getAllEpreuvesOfCompetition';
    const params = { id: id };
    console.log(id);
    return this.http.get(url, { params });
  }

}
