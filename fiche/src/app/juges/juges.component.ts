// juges.component.ts
import { Component, OnInit } from '@angular/core';
import { JugesService } from '../services/juges.service';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

interface Juge {
  juge_id: number;
  firstname: string;
  surename: string;
  username: string;
  password: string;
  role_id: number;
  date_auth: Date;
  response: string;
}

@Component({
  selector: 'app-juges',
  templateUrl: './juges.component.html',
  styleUrls: ['./juges.component.css'],
  imports: [FormsModule]
})
export class JugesComponent implements OnInit {
  // juges: Juge[] = [];
  // nouveauJuge: Partial<Juge> = {};
  // isEditing: boolean = false;

  // constructor(private jugesService: JugesService) {}

   ngOnInit(): void {
     //this.getJuges();
   }

  // getJuges(): void {
  //   this.jugesService.getJuges().subscribe(data => this.juges = data);
  // }

  // addJuge(): void {
  //   this.jugesService.createJuge(this.nouveauJuge).subscribe(() => {
  //     this.getJuges();
  //     this.nouveauJuge = {};
  //   });
  // }

  // editJuge(juge: Juge): void {
  //   this.nouveauJuge = { ...juge };
  //   this.isEditing = true;
  // }

  // updateJuge(): void {
  //   if (!this.nouveauJuge.juge_id) return;
  //   this.jugesService.updateJuge(this.nouveauJuge).subscribe(() => {
  //     this.getJuges();
  //     this.nouveauJuge = {};
  //     this.isEditing = false;
  //   });
  // }

  // deleteJuge(id: number): void {
  //   this.jugesService.deleteJuge(id).subscribe(() => this.getJuges());
  // }
}
