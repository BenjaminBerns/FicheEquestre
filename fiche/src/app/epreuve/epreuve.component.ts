import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { PopUpComponent } from '../pop-up/pop-up.component';

@Component({
  selector: 'app-epreuve',
  imports: [NgIf, PopUpComponent],
  templateUrl: './epreuve.component.html',
  styleUrl: './epreuve.component.css'
})
export class EpreuveComponent {
  isPopUpOpen = false;
  openPopUp() {
    this.isPopUpOpen = true;
  }
}
