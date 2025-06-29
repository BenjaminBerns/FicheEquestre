import { Routes } from '@angular/router';
import { ConnexionComponent} from './connexion/connexion.component';
import {HomeComponent} from './home/home.component';
import { ListComponent } from './competitions/list/list.component';
import { EpreuvesComponent } from './competitions/epreuves/epreuves.component';


export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'connexion', component: ConnexionComponent},
  {path: 'listecompetitions', component: ListComponent},
  {path: 'competitions/:id/epreuves', component: EpreuvesComponent}
];
