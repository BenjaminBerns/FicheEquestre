import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EpreuvesService } from '../services/epreuves.service';
import { FormsModule, NgModel } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-detail-epreuve',
  imports: [FormsModule],
  templateUrl: './detail-epreuve.component.html',
  styleUrl: './detail-epreuve.component.css'
})
export class DetailEpreuveComponent {

  constructor(
    private route: ActivatedRoute,
    private EpreuveService: EpreuvesService,
    private router: Router,
    private http: HttpClient
  ) { }
  
  id: string | null = null;

  epreuve_id: number | null = null;
  epreuve_name: string = '';
  epreuve_description: string = '';
  epreuve_materiels: string = '';
  competition_id: number | null = null;
  updatedData: any = null;
  notation_type: number | null = null;
  juge_id: number | null = null;
  
  ngOnInit(): void {
    console.log("hello world !");
    this.id = this.route.snapshot.paramMap.get('id');
    const idNumber = this.id !== null ? Number(this.id) : null;
    if (idNumber !== null && !isNaN(idNumber)) {
      this.EpreuveService.getEpreuvesById(idNumber).subscribe(data => {
        console.log('Voici les données récupérer : ', data);
        
        const epreuve: import('../services/epreuves.service').Epreuve = {
          epreuve_id: data.data.epreuve_id,
          epreuve_name: data.data.epreuve_name,
          epreuve_description: data.data.epreuve_description,
          epreuve_materiels: data.data.epreuve_materiels,
          competition_id: data.data.competition_id,
          juge_id: data.data.juge_id,
          notation_type: data.data.notation_type
        };

        this.epreuve_id = epreuve.epreuve_id;
        this.epreuve_name = epreuve.epreuve_name;
        this.epreuve_description = epreuve.epreuve_description;
        this.epreuve_materiels = epreuve.epreuve_materiels;
        this.competition_id = epreuve.competition_id;
        this.notation_type = epreuve.notation_type;
        this.juge_id = epreuve.juge_id;

        //update du champ updateData
        this.updatedData = epreuve;
        console.log(this.epreuve_id );
      });
    } else {
      console.error("L'identifiant de l'épreuve est invalide ou manquant.");
    }
  }

  async updateEpreuve() {
    console.log('EPREUVE : ' ,this.updatedData);
        this.updatedData.epreuve_id = this.epreuve_id;
        this.updatedData.epreuve_name = this.epreuve_name;
        this.updatedData.epreuve_description = this.epreuve_description;
        this.updatedData.epreuve_materiels = this.epreuve_materiels;
        this.updatedData.competition_id = this.competition_id;
        this.updatedData.notation_type = this.notation_type;
        this.updatedData.juge_id = this.juge_id;
    this.EpreuveService.UpdateEpreuve(Number(this.id), this.updatedData).subscribe(data => {
      console.log(data);
    });
    await new Promise(resolve => setTimeout(resolve, 1000));//pause de 1 seconde pour laisser le temps d'effectuer la requete avant de récupérer la liste des compétitions
    this.router.navigate(['//competitions', this.competition_id, 'epreuves']);
  }

 getJugesByCompetition(id: number): Observable<any> {
    const url = 'http://prod-project-32/api/competition/getJugesByCompetition';
    const params = { id: id };
    return this.http.get(url, { params });
  }
}