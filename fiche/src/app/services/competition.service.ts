import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs'; //que pour les fake données

export interface Competition {
  id: number;
  nom: string;
  date: string;
  statut: string;
  location: string;
  createdBy: number;
  createdAt: string;
}

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
export class CompetitionService {
  /*private apiUrl = 'http://localhost:8000/api/competitions'; // endpoint de l'API

  constructor(private http: HttpClient) {}

  getCompetitions(): Observable<Competition[]> {
    return this.http.get<Competition[]>(this.apiUrl);
  }*/

  private fakeCompetitions: Competition[] = [
    {
      id: 1,
      nom: 'Compétition de Villefranche',
      date: '2025-05-16',
      statut: 'En attente',
      location: 'Villefranche-sur-Saône',
      createdBy: 101,
      createdAt: '2025-04-20T10:30:00Z'
    },
    {
      id: 2,
      nom: 'Compétiton des monts lyonnais',
      date: '2025-04-28',
      statut: 'En cours',
      location: 'Lyon',
      createdBy: 102,
      createdAt: '2025-04-21T14:15:00Z'
    },
    {
      id: 3,
      nom: 'Compétition de Saint Priest',
      date: '2025-02-12',
      statut: 'Terminée',
      location: 'Saint-Priest',
      createdBy: 103,
      createdAt: '2025-01-25T08:00:00Z'
    },
    {
      id: 4,
      nom: 'Compétition de Marcy-l’Étoile',
      date: '2025-01-04',
      statut: 'Terminée',
      location: 'Marcy-l’Étoile',
      createdBy: 101,
      createdAt: '2025-01-01T08:00:00Z'
    }
  ];

  private fakeEpreuves: Epreuve[] = [
    {
      epreuve_id: 1,
      competition_id: 1,
      juge_id: 10,
      notation_type: 1,
      epreuve_name: 'Saut d’obstacles',
      epreuve_description: 'Épreuve de saut d’obstacles classique',
      epreuve_materiels: 'Matériel de saut, barres, plots'
    },
    {
      epreuve_id: 2,
      competition_id: 1,
      juge_id: 11,
      notation_type: 2,
      epreuve_name: 'Dressage',
      epreuve_description: 'Épreuve de dressage avec figures imposées',
      epreuve_materiels: 'Manège, lettres de dressage, barres au sol'
    },
    {
      epreuve_id: 3,
      competition_id: 2,
      juge_id: 12,
      notation_type: 1,
      epreuve_name: 'Concours complet',
      epreuve_description: 'Épreuve de concours complet avec saut, dressage et cross',
      epreuve_materiels: 'Saut d’obstacles, manège, parcours de cross'
    },
    {
      epreuve_id: 4,
      competition_id: 2,
      juge_id: 13,
      notation_type: 2,
      epreuve_name: 'Endurance',
      epreuve_description: 'Épreuve d’endurance sur un parcours de 20 km',
      epreuve_materiels: 'Parcours balisé, points de contrôle'
    },
    {
      epreuve_id: 5,
      competition_id: 3,
      juge_id: 14,
      notation_type: 1,
      epreuve_name: 'Trec',
      epreuve_description: 'Épreuve de Trec avec maniabilité et vitesse',
      epreuve_materiels: 'Parcours d’obstacles, chronomètre'
    }
  ];



  constructor() {}

  getCompetitions(): Observable<Competition[]> {
    return of(this.fakeCompetitions);
    }

    

    getEpreuvesByCompetitionId(competitionId: number): Observable<Epreuve[]> {
    const epreuves = this.fakeEpreuves.filter(e => e.competition_id === competitionId);
    return of(epreuves);
  }

  private idCounter = 4; // Pour simuler les ID auto-incrémentés

addCompetition(data: Partial<Competition>): Observable<Competition> {
  const newCompetition: Competition = {
    id: this.idCounter++,
    nom: data.nom!,
    date: data.date!,
    statut: data.statut!,
    location: data.location!,
    createdBy: 999, // temporaire
    createdAt: new Date().toISOString()
  };
  this.fakeCompetitions.push(newCompetition);
  return of(newCompetition);
}

getCompetitionById(id: number): Observable<Competition | undefined> {
  const found = this.fakeCompetitions.find(c => c.id === id);
  return of(found);
}

updateCompetition(id: number, data: Partial<Competition>): Observable<Competition | undefined> {
  const index = this.fakeCompetitions.findIndex(c => c.id === id);
  if (index !== -1) {
    this.fakeCompetitions[index] = {
      ...this.fakeCompetitions[index],
      ...data
    };
    return of(this.fakeCompetitions[index]);
  }
  return of(undefined);
}
}
