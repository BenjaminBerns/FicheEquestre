import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent {

  constructor(private http: HttpClient) { }

  email: string = '';
  password: string = '';
  user: string = '';
  status: boolean = false;

  Email() {
    this.http.post<{ user: string, status: boolean }>('http://prod-project-32/auth/isEmailExist', { email: this.email })
      .subscribe({
        next: (response) => {
          console.log('Réponse de l\'API :', response);
          this.status = response.status;
          this.user = response.user;
        },
        error: (err) => {
          console.error('Erreur API', err);
        }
      });
  }


}
