// juges.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export interface Juge {
  juge_id: number;
  firstname: string;
  surename: string;
  username: string;
  password: string;
  role_id: number;
  date_auth: Date;
  response: string;
}


@Injectable({
  providedIn: 'root'
})
export class JugesService {


  

  /*private apiUrl = 'http://localhost:3000/api/juges';

  constructor(private http: HttpClient) {}

  getJuges(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  createJuge(juge: any): Observable<any> {                         // API
    return this.http.post(this.apiUrl, juge);
  }

  updateJuge(juge: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${juge.juge_id}`, juge);
  }

  deleteJuge(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }*/





  //FAKE

   private fakeJuges: Juge[] = [
    {
      juge_id: 10,
      firstname: 'Alice',
      surename: 'Martin',
      username: 'alice.m',
      password: 'pass123',
      role_id: 1,
      date_auth: new Date(),
      response: 'OK'
    },
    {
      juge_id: 11,
      firstname: 'Bob',
      surename: 'Dupont',
      username: 'bob.d',
      password: 'pass456',
      role_id: 2,
      date_auth: new Date(),
      response: 'OK'
    },
    {
      juge_id: 12,
      firstname: 'Claire',
      surename: 'Durand',
      username: 'claire.d',
      password: 'pass789',
      role_id: 1,
      date_auth: new Date(),
      response: 'OK'
    }
  ];

  getJuges(): Observable<Juge[]> {
    return of(this.fakeJuges);
  }

  createJuge(juge: Partial<Juge>): Observable<void> {
    const newJuge: Juge = {
      ...juge,
      juge_id: Math.max(...this.fakeJuges.map(j => j.juge_id)) + 1,
      date_auth: new Date(),
      response: 'OK'
    } as Juge;
    this.fakeJuges.push(newJuge);
    return of();
  }

  updateJuge(juge: Partial<Juge>): Observable<void> {
    const index = this.fakeJuges.findIndex(j => j.juge_id === juge.juge_id);
    if (index !== -1) {
      this.fakeJuges[index] = { ...this.fakeJuges[index], ...juge } as Juge;
    }
    return of();
  }

  deleteJuge(id: number): Observable<void> {
    this.fakeJuges = this.fakeJuges.filter(j => j.juge_id !== id);
    return of();
  }
}
