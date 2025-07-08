import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../environnements/environnements';

export interface Cavalier {
  cavalier_id: number;
  cavalier_dossard: string;
  cavalier_nom: string;
}

@Injectable({
  providedIn: 'root'
})
export class CavaliersService {
  private cavaliers: Cavalier[] = [
    {
      cavalier_id: 1,
      cavalier_nom: 'Claire',
      cavalier_dossard: 'Durand'
    },
    {
      cavalier_id: 2,
      cavalier_nom: 'Lucas',
      cavalier_dossard: 'Martin',
    }
  ];

  constructor(private http: HttpClient) { }

  // getAllCavaliers(): Observable<Cavalier[]> {
  //   return of(this.cavaliers);
  // }

  getAllCavaliers(): Observable<any> {
    const url = `${environment.apiUrl}/cavalier/getAllCavaliers`;
    return this.http.get(url);
  }

  getCavalierById(id: number): Observable<any> {
    const url = `${environment.apiUrl}/cavalier/getSpecificCavalier`;
    const params = {
      id: id
    }
    return this.http.get(url, { params });
  }

  addCavalier(cavalier: Cavalier): Observable<Cavalier> {
    this.cavaliers.push(cavalier);
    return of(cavalier);
  }

  updateCavalier(cavalier: Cavalier): Observable<Cavalier | null> {
    const index = this.cavaliers.findIndex(c => c.cavalier_id === cavalier.cavalier_id);
    if (index !== -1) {
      this.cavaliers[index] = cavalier;
      return of(cavalier);
    }
    return of(null);
  }

  deleteCavalier(id: number): Observable<boolean> {
    const index = this.cavaliers.findIndex(c => c.cavalier_id === id);
    if (index !== -1) {
      this.cavaliers.splice(index, 1);
      return of(true);
    }
    return of(false);
  }
}
