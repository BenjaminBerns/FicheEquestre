import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { JugesService, Juge } from '../services/juges.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-juge',
  imports: [NgFor, RouterLink],
  templateUrl: './juge.component.html',
  styleUrl: './juge.component.css'
})
export class JugeComponent {

  juges: Juge[] = [];
  id: string | null = null;
  competiton_id: number | null = null;
  juge_id: number | null = null;

  
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
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    this.jugeService.getJugesByCompetition(Number(this.id)).subscribe(data => {
      this.juges = data.data;
      console.log('this.juges', this.juges);
      // Les données competition_juge sont à l'intérieur de chaque juge dans le tableau data.data
      // Il faut donc accéder à data.data[0].competition_juge
      if (data.data && data.data.length > 0 && data.data[0].competition_juge) {
        this.competiton_id = data.data[0].competition_juge.competition_id;
        this.juge_id = data.data[0].competition_juge.juge_id;
      } else {
        this.competiton_id = null;
        this.juge_id = null;
      }
      console.log('Competition + juge ID INFOS : ',this.competiton_id, this.juge_id);
      console.log('JUGES INFOS : ', data);
    });
  }

  qrcode() {
    
  }

}
