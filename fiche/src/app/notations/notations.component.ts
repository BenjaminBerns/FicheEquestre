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
    // Correction de l'erreur NG0900 : s'assurer que les données reçues sont bien un tableau
    // L'API retourne probablement un objet contenant un champ "data" qui est le tableau attendu
    if (this.epreuveId) {
      this.service.getNotationsByEpreuveId(this.epreuveId).subscribe(
        (res: any) => {
          // Si la réponse contient un champ "data", on l'utilise, sinon on prend la réponse telle quelle
          this.notations = Array.isArray(res) ? res : (res.data ? res.data : []);
        }
      );
    } else {
      this.service.getAllNotations().subscribe(
        (res: any) => {
          this.notations = Array.isArray(res) ? res : (res.data ? res.data : []);
        }
      );
    }
  }
}
