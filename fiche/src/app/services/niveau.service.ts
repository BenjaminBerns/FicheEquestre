import { Injectable } from '@angular/core';

export interface Niveau {
  niveau_id: number;
  niveau_nom: number;
}

@Injectable({
  providedIn: 'root'
})
export class NiveauService {

  constructor() { }

  ListNiveau: Niveau[] = [];

  getAllNiveau(): Niveau[] {
    return this.ListNiveau;
  }

  setNiveau(nv: Niveau[]): void {
    nv = this.ListNiveau;
  }

}
