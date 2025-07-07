import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../environnements/environnements';

export interface Cavalier {
  cavalier_id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  birthdate: string;
  licence_number: string;
}

@Injectable({
  providedIn: 'root'
})
export class CavaliersService {
  private cavaliers: Cavalier[] = [
    {
      cavalier_id: 1,
      firstname: 'Claire',
      lastname: 'Durand',
      email: 'claire.durand@example.com',
      phone: '0601020304',
      birthdate: '2001-05-12',
      licence_number: 'LIC123456'
    },
    {
      cavalier_id: 2,
      firstname: 'Lucas',
      lastname: 'Martin',
      email: 'lucas.martin@example.com',
      phone: '0605060708',
      birthdate: '1998-11-23',
      licence_number: 'LIC654321'
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

  getCavalierById(id: number): Observable<Cavalier | null> {
    const cav = this.cavaliers.find(c => c.cavalier_id === id);
    return of(cav || null);
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
