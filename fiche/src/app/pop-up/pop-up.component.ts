import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EpreuvesService } from '../services/epreuves.service';
import { CompetitionService } from '../services/competition.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-pop-up',
  imports: [RouterLink, NgIf],
  templateUrl: './pop-up.component.html',
  styleUrl: './pop-up.component.css'
})
export class PopUpComponent {
constructor(
    private route: ActivatedRoute,
    private service: EpreuvesService,
    private router: Router
  ) { }
  
  id: string | null = null;
  juge_id: string | null = null;
  isEpreuve: boolean | null = null;

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.isEpreuve = this.router.url.includes('epreuve');
    this.juge_id = this.route.snapshot.paramMap.get('juge_id');
  }
}
