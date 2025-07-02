import { Component, OnInit } from '@angular/core';
import { CompetitionService } from '../services/competition.service';
import { QRCodeComponent } from 'angularx-qrcode';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-qr',
  imports: [QRCodeComponent, FormsModule, HttpClientModule],
  templateUrl: './qr.component.html',
  styleUrl: './qr.component.css'
})
export class QRComponent {
  constructor(
    private http: HttpClient,
    private competitionService: CompetitionService,
    private router: Router,
    private route: ActivatedRoute
  ) { }


  qrcode: string = '';
  req: any = '';
  err: any = '';
  id_competition: string | null = null;
  id_juge: string | null = null;

  ngOnInit() {
    
    this.id_competition = this.route.snapshot.paramMap.get('id_competition');
    this.id_juge = this.route.snapshot.paramMap.get('id_juge');
    console.log("id compétition : ", this.id_competition, " | id juge : ", this.id_juge);
    this.qrcode = this.competitionService.createQrCode();
    this.competitionService.QRcodeExist(this.qrcode).subscribe({
      next: (response) => {
        this.req = response;
        console.log('Réponse :', response.status);
      },
      error: (err) => {
        console.error('Erreur API', err);
        this.err = err.error.status;
        console.log('Erreur :', err.error.status);
      }
    });
    if (this.err == false) {
      this.competitionService.CreateQRcodeAPI(this.qrcode, Number(this.id_juge), Number(this.id_competition)).subscribe({
      next: (response) => {
        console.log('Réponse status :', response);
        this.req = response;
      },
      error: (err) => {
        console.error('Erreur API', err);
        this.qrcode = err.error.data.securite_key_id;
        console.log(this.qrcode);
        if (this.qrcode != null) {
          console.log("QR code existant reçu !");
        }
      }
    });
    }
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
