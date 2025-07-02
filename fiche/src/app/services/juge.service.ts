import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CompetitionJuge {
  juge_id: number;
  competition_id: number;
}

export interface Juge {
  juge_id: number;
  firstname: string;
  surename: string;
  username: string;
  password: string;
  role_id: number;
  date_auth: string | null;
  response: string | null;
  competition_juge: CompetitionJuge;
}

@Injectable({
  providedIn: 'root'
})
export class JugeService {

  constructor(private http: HttpClient) { }

 getJugesByCompetition(id: number): Observable<any> {
    const url = 'http://prod-project-32/api/competition/getJugesByCompetition';
    const params = { id: id };
    return this.http.get(url, { params });
  }

}
