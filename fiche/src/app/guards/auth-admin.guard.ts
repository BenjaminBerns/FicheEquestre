import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CompetitionService } from '../services/competition.service';

export class authAdminGuard implements CanActivate {
  
  constructor(private router: Router, private competitionService: CompetitionService) {}

  canActivate(): boolean {
    if (this.competitionService.getConnectionAdmin()) {
      return true;  // Autoriser l'accès
    } else {
      // Rediriger vers la page de connexion si non connecté
      this.router.navigate(['/connexion']);
      return false;  // Refuser l'accès
    }
  }
}
