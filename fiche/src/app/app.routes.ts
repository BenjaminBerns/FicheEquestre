import { Routes } from '@angular/router';
import { ConnexionComponent} from './connexion/connexion.component';
import {HomeComponent} from './home/home.component';


export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'connexion', component: ConnexionComponent}
];
