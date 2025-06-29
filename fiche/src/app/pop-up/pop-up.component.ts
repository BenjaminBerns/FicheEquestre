import { Component } from '@angular/core';
import { DetailCompetitionComponent } from '../detail-competition/detail-competition.component';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-pop-up',
  imports: [DetailCompetitionComponent, RouterOutlet, RouterLink],
  templateUrl: './pop-up.component.html',
  styleUrl: './pop-up.component.css'
})
export class PopUpComponent {

}
