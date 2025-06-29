import { Component, OnInit } from '@angular/core';
import { CompetitionService } from '../services/competition.service';
import { QRCodeComponent } from 'angularx-qrcode';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qr',
  imports: [QRCodeComponent, FormsModule, HttpClientModule],
  templateUrl: './qr.component.html',
  styleUrl: './qr.component.css'
})
export class QRComponent {
  constructor(private http: HttpClient, private competitionService: CompetitionService, private router: Router) {}


  qrcode: string = '';
  req: any = '';

  ngOnInit() {
    this.qrcode = this.competitionService.createQrCode();
    this.competitionService.QRcodeExist(this.qrcode).subscribe({
      next: (response) => {
        console.log('Réponse :', response);
        this.req = response;
      },
      error: (err) => {
        console.error('Erreur API', err);
      }
    });
  }
  //       next: (response) => {
  //         console.log('Réponse de l\'API :', response);
  //         this.status = response.status;
  //         this.user = response.user;
  //         bcrypt.compare(this.password, this.user.password, (err, result) => {
  //           if (err) {
  //             console.error('Erreur lors de la comparaison des mots de passe', err);
  //           } else if (result) {
  //             console.log('Le mot de passe est OK');
  //             this.popUp = true;
  //             this.competitionService.setConnect(this.popUp);
  //             this.router.navigate(['/listecompetitions']);
  //           } else {
  //             console.log('Le mot de passe n\'est pas le bon');
  //           }
  //         });
  //       },
  //       error: (err) => {
  //         console.error('Erreur API', err);
  //       }
  //     });
  // }
}
