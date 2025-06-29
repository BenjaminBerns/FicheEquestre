import { Routes } from '@angular/router';
import { ConnexionComponent} from './connexion/connexion.component';
import { ListComponent } from './competitions/list/list.component';
import { EpreuvesComponent } from './competitions/epreuves/epreuves.component';
import { HomeComponent } from './home/home.component';
import { EpreuveComponent } from './epreuve/epreuve.component';
import { DetailCompetitionComponent } from './detail-competition/detail-competition.component';
import { FormComponent } from './competitions/form/form.component';
import { QRComponent } from './qr/qr.component';
import { PopUpComponent } from './pop-up/pop-up.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'connexion', component: ConnexionComponent},
  {path: 'listecompetitions', component: ListComponent},
  {path: 'competitions/:id/epreuves', component: EpreuvesComponent},
  {path: 'connexion', component: ConnexionComponent},
  { path: 'epreuve', component: EpreuveComponent },
  { path: 'pop-up', component: PopUpComponent},
  { path: 'detail-competition', component: DetailCompetitionComponent },
  { path: 'competitions/ajouter', component: FormComponent },
  { path: 'competitions/:id/modifier', component: FormComponent },
  { path: 'qr-code', component: QRComponent },
  { path: 'formCompetitions', component: FormComponent}
];
