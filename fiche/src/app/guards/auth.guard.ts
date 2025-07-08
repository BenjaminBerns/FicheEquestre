// import { CanActivateFn } from '@angular/router';

// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CompetitionService } from '../services/competition.service';

@Injectable({
  providedIn: 'root'
})
  
export class AuthGuard implements CanActivate {
  

  constructor(private router: Router, private competitionService: CompetitionService) {}

  canActivate(): boolean {
    if (this.competitionService.getConnection()) {
      return true;  // Autoriser l'accès
    } else {
      // Rediriger vers la page de connexion si non connecté
      this.router.navigate(['/connexion']);
      return false;  // Refuser l'accès
    }
  }
}
