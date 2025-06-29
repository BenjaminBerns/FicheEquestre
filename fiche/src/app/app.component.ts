import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';
import { CompetitionService } from './services/competition.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  // constructor(private competitionService: CompetitionService) {}

  // // Getter propre
  // get IsConnected(): boolean {
  //   return this.competitionService.IsConnected;
  // }
}
