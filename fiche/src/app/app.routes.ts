import { Routes } from '@angular/router';
import { ConnexionComponent} from './connexion/connexion.component';
import { ListComponent } from './competitions/list/list.component';
import { EpreuvesComponent } from './competitions/epreuves/epreuves.component';
import { HomeComponent } from './home/home.component';
import { DetailCompetitionComponent } from './detail-competition/detail-competition.component';
import { FormComponent } from './competitions/form/form.component';
import { QRComponent } from './qr/qr.component';
import { PopUpComponent } from './pop-up/pop-up.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { JugeComponent } from './juge/juge.component';
import { DetailEpreuveComponent } from './detail-epreuve/detail-epreuve.component';
import { config } from 'rxjs';
import { JugesComponent } from './juges/juges.component';
import { CavaliersComponent } from './cavaliers/cavaliers.component';
import { DetailJugeComponent } from './detail-juge/detail-juge.component';
import { PortailAppComponent } from './portail-app/portail-app.component';

export const routes: Routes = [
  //----------------------Accueil + Connexion--------------------//
  { path: '', component: HomeComponent},
  { path: 'connexion', component: ConnexionComponent},
  { path: 'connexion', component: ConnexionComponent },
  
  //----------------------Pop-Up--------------------//
  { path: 'pop-up/competition/:id', component: PopUpComponent},
  { path: 'pop-up/epreuve/:id/juge/:juge_id', component: PopUpComponent },
  
  //----------------------QrCode--------------------//
  { path: 'qr-code/competition/:id_competition/juge/:id_juge', component: QRComponent },

  //----------------------Configuration--------------------//
  { path: 'Configuration', component: ConfigurationComponent },
  
  //----------------------Juges--------------------//
  { path: 'juges/competition/:id', component: JugeComponent},
  { path: 'juges/epreuve/:id', component: JugeComponent }, 
  { path: 'juges/detail-juge/:id', component: DetailJugeComponent},

  //----------------------Epreuves--------------------//
  { path: 'detail-epreuves/:id', component: DetailEpreuveComponent },
  { path: 'competitions/:id/epreuves', component: EpreuvesComponent },
  
  //----------------------Compétitions--------------------//
  { path: 'listecompetitions', component: ListComponent},
  { path: 'competitions/:id/epreuves', component: EpreuvesComponent},
  { path: 'connexion', component: ConnexionComponent},
  { path: 'pop-up/:id', component: PopUpComponent},
  { path: 'detail-competition/:id', component: DetailCompetitionComponent },
  { path: 'listecompetitions', component: ListComponent},
  { path: 'formCompetitions', component: FormComponent },
  { path: 'competitions/ajouter', component: FormComponent },
  { path: 'competitions/:id/modifier', component: FormComponent },
  { path: 'juges', component: JugesComponent },
  { path: 'epreuves', component: EpreuvesComponent },
  { path: 'cavaliers', component: CavaliersComponent },

  { path: 'app-download', component: PortailAppComponent },
];
