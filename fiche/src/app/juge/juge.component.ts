import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { JugesService, Juge } from '../services/juges.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-juge',
  imports: [NgIf, RouterLink],
  templateUrl: './juge.component.html',
  styleUrl: './juge.component.css'
})
export class JugeComponent {

  juges: Juge | null = null;
  juge_id: string | null = null;
  competiton_id: number | null = null;

  
  // competition_juge
  // competition_id
  // juge_id
  // qr-code/competition/:id_competition/juge/:id_juge

  constructor(
    private jugeService: JugesService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.juge_id = this.route.snapshot.paramMap.get('id');
  
    //récuperer Juges par identifiant 
    this.jugeService.getJugesById(Number(this.juge_id)).subscribe(data => {
      this.juges = data.data;
      console.log('this.juge', this.juges);
    })

    //récuperer competition_id
    this.jugeService.getCompetitionByJuge(Number(this.juge_id)).subscribe(data => {
      this.competiton_id = data.data[0].competition_id;
      console.log('this.competition_id', this.competiton_id);
    })
  }
}
