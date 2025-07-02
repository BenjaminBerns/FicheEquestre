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
    const url = 'http://prod-project-32/api/epreuve/getAllEpreuvesOfCompetition';
    const params = { id: id };
    console.log(id);
    return this.http.get(url, { params });
  }

  getEpreuvesById(id: number): Observable<any> {
    const url = 'http://prod-project-32/api/epreuve/getSpecificEpreuve';
    const params = { id: id };
    console.log(id);
    return this.http.get(url, { params });
  }

  UpdateEpreuve(id: number, updatedData: Epreuve): Observable<any> {
    console.log("updatedData : -->", updatedData);
    // Ajout du paramètre id dans le corps envoyé à l'API
    const body = {
      id: id,
      epreuve_id: updatedData.epreuve_id,
      epreuve_name: updatedData.epreuve_name,
      epreuve_description: updatedData.epreuve_description,
      epreuve_materiels: updatedData.epreuve_materiels,
      competition_id: updatedData.competition_id,
      juge_id: updatedData.juge_id,
      notation_type: updatedData.notation_type
    };
    const url = 'http://prod-project-32/api/epreuve/updateEpreuve';
    return this.http.put(url, body);
  }
}
