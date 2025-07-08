import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EpreuvesService } from '../services/epreuves.service';
import { Juge, JugesService } from '../services/juges.service';
import { Competition, CompetitionService, Epreuve } from '../services/competition.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
// import { NgFor } from '@angular/common';

@Component({
  selector: 'app-juges-editor',
  imports: [FormsModule],
  templateUrl: './juges-editor.component.html',
  styleUrl: './juges-editor.component.css'
})
export class JugesEditorComponent {

  firstname: string = '';
  juge_id: number = 0; 
  password: string = '';
  response: string | null = null;
  role_id: number | null = null; 
  surename: string = '';
  username: string = '';



constructor(
    private route: ActivatedRoute,
    private CompetitionService: CompetitionService,
    private EpreuveService: EpreuvesService,
    private jugesServices: JugesService,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    
  }

  addJuges(): void {
    const juges = {
      firstname: this.firstname,
      juge_id: this.juge_id,
      response: this.response,
      surename: this.surename,
      username: this.username,
      password: this.password
    };
    console.log('Juge à ajouté :', juges);
    this.jugesServices.AddJuges(juges);
  }

}
