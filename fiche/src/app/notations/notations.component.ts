import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotationsService, Notation } from '../services/notations.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-notations',
  templateUrl: './notations.component.html',
  styleUrls: ['./notations.component.css'],
  imports: [NgFor, NgIf],
})
export class NotationsComponent implements OnInit {
  notations: Notation[] = [];
  epreuveId: number | null = null;

  constructor(private service: NotationsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.epreuveId = id ? +id : null;

    if (this.epreuveId) {
      this.service.getNotationsByEpreuveId(this.epreuveId).subscribe(data => this.notations = data);
    } else {
      this.service.getAllNotations().subscribe(data => this.notations = data);
    }
  }
}
