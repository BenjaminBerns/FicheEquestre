import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { JugeService, Juge } from '../services/juge.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-juge',
  imports: [NgFor],
  templateUrl: './juge.component.html',
  styleUrl: './juge.component.css'
})
export class JugeComponent {

  juges: Juge[] = [];
  id: string | null = null;

  constructor(
    private jugeService: JugeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    this.jugeService.getJugesByCompetition(Number(this.id)).subscribe(data => {
      this.juges = data.data;
      console.log(this.juges);
    });
  }

  qrcode() {
    
  }

}
