import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import bcrypt from 'bcryptjs';
import { CompetitionService } from '../services/competition.service';
import { Router } from '@angular/router';
import { environment } from '../../environnements/environnements';


@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent {
  
  email: string = '';
  password: string = '';
  user: any = '';
  status: boolean = false;
  user_id: number = 0;
  firstname: string = '';
  surename: string = '';
  passwordAPI: string = '';
  role_id: number = 0;
  created_at: any = null;
  popUp: boolean = false;
  
  constructor(private http: HttpClient, private competitionService: CompetitionService, private router: Router) { }

  Email() {
    this.http.post<{ status: boolean, user: any }>(
      environment.apiUrl + '/auth/isEmailExist',
      { email: this.email }
    ).subscribe({
      next: (response) => {
        console.log('Réponse de l\'API :', response);
        this.status = response.status;
        this.user = response.user;
        this.role_id = response.user.role_id;
        if (this.role_id == 1) {
          this.competitionService.setConnectionAdmin(true);
        } else if (this.role_id == 2){
          this.competitionService.setConnection(true);
        } else (
          console.log('ERREUR : Role de l\'utilisateur non reconnue')
        )
        bcrypt.compare(this.password, this.user.password, (err, result) => {
          if (err) {
            console.error('Erreur lors de la comparaison des mots de passe', err);
          } else if (result) {
            console.log('Le mot de passe est OK');
            this.popUp = true;
            this.competitionService.setConnect(this.popUp);
            this.router.navigate(['/listecompetitions']);
          } else {
            console.log('Le mot de passe n\'est pas le bon');
          }
        });
      },
      error: (err) => {
        console.error('Erreur API', err);
      }
    });

  }
}
