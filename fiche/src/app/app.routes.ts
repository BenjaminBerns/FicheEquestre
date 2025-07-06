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
import { NotationsComponent } from './notations/notations.component';
import { AuthGuard } from './guards/auth.guard';
import { authAdminGuard } from './guards/auth-admin.guard';
import { CompetitionEditorComponent } from './competition-editor/competition-editor.component';
import { EpreuveEditorComponent } from './epreuve-editor/epreuve-editor.component';

export const routes: Routes = [
  //----------------------Accueil + Connexion--------------------//
  { path: '', component: HomeComponent},
  { path: 'connexion', component: ConnexionComponent},
  { path: 'connexion', component: ConnexionComponent },
  
  //----------------------Pop-Up--------------------//
  { path: 'pop-up/competition/:id', component: PopUpComponent, canActivate: [AuthGuard]},
  { path: 'pop-up/epreuve/:id/juge/:juge_id', component: PopUpComponent, canActivate: [AuthGuard] },
  { path: 'pop-up/SetNombresEpreuves', component: PopUpComponent, canActivate: [AuthGuard] },
  
  //----------------------QrCode--------------------//
  { path: 'qr-code/competition/:id_competition/juge/:id_juge', component: QRComponent, canActivate: [AuthGuard] },

  //----------------------Configuration--------------------//
  { path: 'Configuration', component: ConfigurationComponent, canActivate: [AuthGuard] },
  
  //----------------------Juges--------------------//
  { path: 'juges/competition/:id', component: JugeComponent, canActivate: [AuthGuard] },
  { path: 'juges/epreuve/:id', component: JugeComponent, canActivate: [AuthGuard]  }, 
  { path: 'juges/detail-juge/:id', component: DetailJugeComponent, canActivate: [AuthGuard] },

  //----------------------Epreuves--------------------//
  { path: 'detail-epreuves/:id', component: DetailEpreuveComponent, canActivate: [AuthGuard]  },
  { path: 'competitions/:id/epreuves', component: EpreuvesComponent, canActivate: [AuthGuard]  },
  { path: 'addEpreuve/:id', component: EpreuveEditorComponent, canActivate: [AuthGuard] },
  //----------------------Compétitions--------------------//
  { path: 'listecompetitions', component: ListComponent, canActivate: [AuthGuard] },
  { path: 'competitions/:id/epreuves', component: EpreuvesComponent, canActivate: [AuthGuard] },
  { path: 'connexion', component: ConnexionComponent, canActivate: [AuthGuard] },
  { path: 'pop-up/:id', component: PopUpComponent, canActivate: [AuthGuard] },
  { path: 'detail-competition/:id', component: DetailCompetitionComponent, canActivate: [AuthGuard]  },
  { path: 'listecompetitions', component: ListComponent, canActivate: [AuthGuard] },
  { path: 'formCompetitions', component: FormComponent, canActivate: [AuthGuard]  },
  { path: 'competitions/ajouter', component: FormComponent, canActivate: [AuthGuard]  },
  { path: 'competitions/:id/modifier', component: FormComponent, canActivate: [AuthGuard]  },
  { path: 'juges', component: JugesComponent, canActivate: [AuthGuard]  },
  { path: 'epreuves', component: EpreuvesComponent, canActivate: [AuthGuard]  },
  { path: 'cavaliers', component: CavaliersComponent, canActivate: [AuthGuard] },
  { path: 'competitionEdit/:idc', component: CompetitionEditorComponent, canActivate: [AuthGuard] },
  { path: 'competitionAdd/:nb', component: CompetitionEditorComponent, canActivate: [AuthGuard] },

  //----------------------Notations--------------------//
  { path: 'notations', component: NotationsComponent, canActivate: [AuthGuard]  },
  { path: 'notations/epreuve/:id', component: NotationsComponent, canActivate: [AuthGuard]  }, 

  { path: 'app-download', component: PortailAppComponent },
];
