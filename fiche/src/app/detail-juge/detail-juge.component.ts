import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { JugesService } from '../services/juges.service';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-detail-juge',
  imports: [FormsModule],
  templateUrl: './detail-juge.component.html',
  styleUrl: './detail-juge.component.css'
})
export class DetailJugeComponent {


  constructor(
    private route: ActivatedRoute,
    private JugesService: JugesService,
    private router: Router,
    private http: HttpClient
  ) { }
  
  id: string | null = null;

  juge_id: number | null = null;
  firstname: string = '';
  surename: string = '';
  username: string = '';
  password: string = '';
  role_id: number | null = null;
  date_auth: string | Date |  null = null;
  response: string = '';
  competition_id: number | null = null;
  
  updatedData: any = null;
  
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    const idNumber = this.id !== null ? Number(this.id) : null;
    if (idNumber !== null && !isNaN(idNumber)) {
      this.JugesService.getJugesByCompetition(idNumber).subscribe(data => {
        console.log('Voici les données récupérer : ', data);
        
        const Juge: import('../services/juges.service').Juge = {
          juge_id: data.data[0].juge_id,
          firstname: data.data[0].firstname,
          surename: data.data[0].surename,
          username: data.data[0].username,
          password: data.data[0].password,
          role_id: data.data[0].role_id,
          date_auth: data.data[0].date_auth
            ? (() => {
                const dateObj = new Date(data.competition_date);
                const year = dateObj.getFullYear();
                const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
                const day = dateObj.getDate().toString().padStart(2, '0');
                return `${year}-${month}-${day}`;
              })()
            : null,
          response: data.data[0].response,
          competition_juge: {
            juge_id: data.data[0].competition_juge.juge_id,
            competition_id: data.data[0].competition_juge.competition_id
          }
        };

        console.log(Juge);

        this.juge_id = Juge.juge_id;
        this.firstname = Juge.firstname;
        this.surename = Juge.surename;
        this.username = Juge.username;
        this.password = Juge.password;
        this.role_id = Juge.role_id;
        this.date_auth = Juge.date_auth;
        this.response = Juge.response ? Juge.response : '';
        // Récupération du competition_id depuis l'objet imbriqué competition_juge
        this.competition_id = Juge.competition_juge.competition_id;

        //update du champ updateData
        this.updatedData = Juge;
      });
    } else {
      console.error("L'identifiant de l'épreuve est invalide ou manquant.");
    }
  }

  async updateJuge() {
  console.log('JUGE : ', this.updatedData);
  this.updatedData.juge_id = this.juge_id;
  this.updatedData.firstname = this.firstname;
  this.updatedData.surename = this.surename;
  this.updatedData.username = this.username;
  this.updatedData.password = this.password;
  this.updatedData.role_id = this.role_id;
  // this.updatedData.date_auth = this.date_auth;
  this.updatedData.response = this.response;
  // Mettre à jour l'objet imbriqué competition_juge si besoin
  if (!this.updatedData.competition_juge) {
    this.updatedData.competition_juge = {};
  }
  this.updatedData.competition_juge.competition_id = this.competition_id;
  this.updatedData.competition_juge.juge_id = this.juge_id;

  this.JugesService.UpdateJuge(Number(this.juge_id), this.updatedData).subscribe(data => {
    console.log(data);
  });
  await new Promise(resolve => setTimeout(resolve, 1000)); // pause de 1 seconde pour laisser le temps d'effectuer la requête
  this.router.navigate(['//juges/epreuve', this.juge_id]);
  }

}
