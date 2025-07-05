import { Component, NgIterable } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Competition, CompetitionService } from '../services/competition.service';
import { Epreuve, EpreuvesService } from '../services/epreuves.service';
import { FormsModule, NgModel } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { async, Observable } from 'rxjs';
import { NgFor, NgIf } from '@angular/common';
@Component({
  selector: 'app-competition-editor',
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './competition-editor.component.html',
  styleUrl: './competition-editor.component.css'
})
export class CompetitionEditorComponent {

 constructor(
    private route: ActivatedRoute,
    private CompetitionService: CompetitionService,
    private EpreuveService: EpreuvesService,
    private router: Router,
    private http: HttpClient
  ) { }
  
  idc: number = 0;

  isUpdating: boolean = false;

  nbEpreuves: number = 0;

  competition_nom: string = '';
  competition_date: string | null = null;
  competition_location: string = '';
  competition_statut: number = 0;
  created_at: string | null = null;
  created_by: number | null = null;
  updatedDataC: any = null;

  epreuve_id: number | null = null;
  epreuve_name: string = '';
  epreuve_description: string = '';
  epreuve_materiels: string = '';
  competition_id: number = 0;
  updatedDataE: any = null;
  notation_type: number | null = null;
  juge_id: number | null = null;
  epreuves: Epreuve[] = [];
  epreuveData: any | null = null;
  
  ListEpreuvesTemp: Epreuve[] = [];
  competition: Competition[] = [];

  // Nouvelle propriété pour l'épreuve à ajouter
  newEpreuve: {
    epreuve_name: string;
    epreuve_date: string;
    epreuve_status: string;
  } = {
    epreuve_name: '',
    epreuve_date: '',
    epreuve_status: ''
  };

  // Nouvelle propriété pour la compétition à ajouter
  newCompetition: {
    competition_nom: string;
    competition_date: string;
    competition_location: string;
    competition_statut: number;
  } = {
    competition_nom: '',
    competition_date: '',
    competition_location: '',
    competition_statut: 0
  };

  // Méthode pour initialiser ListEpreuvesTemp
  initializeEpreuvesTemp(): void {
    console.log('Initialisation de ListEpreuvesTemp avec nbEpreuves =', this.nbEpreuves);
    this.ListEpreuvesTemp = [];
    const n = Number(this.nbEpreuves);
    console.log('Nombre d\'épreuves à créer:', n);
    if (n > 0) {
      for (let i = 0; i < n; i++) {
        this.ListEpreuvesTemp.push({
          epreuve_id: 0,
          epreuve_name: '',
          epreuve_description: '',
          epreuve_materiels: '',
          notation_type: 0,
          juge_id: 0,
          competition_id: this.competition_id
        });
      }
      console.log('ListEpreuvesTemp créé avec', this.ListEpreuvesTemp.length, 'épreuves');
    }
  }




  //------------------------------------------------------Initialisation---------------------------------------------------------//

  ngOnInit(): void {
  //-------------------ID-Compétitions----------------//
    this.CompetitionService.getAllCompetitions().subscribe({
      next: (data) => {
        this.competition = data;
      }
    });
  //-------------------Compétitions----------------//
    this.idc = Number(this.route.snapshot.paramMap.get('idc'));
    this.nbEpreuves = Number(this.route.snapshot.paramMap.get('nb'));
    console.log('id compétition', this.idc, 'Nombres d\'épreuves souhaité :', this.nbEpreuves);
    
    // Initialiser ListEpreuvesTemp si nbEpreuves est défini
    if (this.nbEpreuves > 0) {
      this.initializeEpreuvesTemp();
    }
    
    if (this.idc !== 0) {
      this.isUpdating = true;
      this.loadEpreuves();
      this.CompetitionService.getCompetitionById(this.idc).subscribe({
        next: (data) => {
          console.log('GETCOMPETITIONBYID',data);
          // Utilisation de l'interface Competition importée depuis le service
          const competition: import('../services/competition.service').Competition = {
            competition_id: data.competition_id,
            competition_nom: data.competition_nom,
            competition_date: data.competition_date
              ? (() => {
                  const dateObj = new Date(data.competition_date);
                  const year = dateObj.getFullYear();
                  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
                  const day = dateObj.getDate().toString().padStart(2, '0');
                  return `${year}-${month}-${day}`;
                })()
              : null,
            competition_location: data.competition_location,
            competition_statut: data.competition_statut,
            created_at: data.created_at,
            created_by: data.created_by
          };

          // Mise à jour des propriétés du composant
          this.competition_id = competition.competition_id;
          this.competition_nom = competition.competition_nom;
          this.competition_date = competition.competition_date;
          this.competition_location = competition.competition_location;
          this.competition_statut = competition.competition_statut;
          this.created_at = competition.created_at;
          this.created_by = competition.created_by;

          // Remplace updatedData par un objet de type Competition
          this.updatedDataC = competition;
        }
      });
    } else {
      console.error("L'identifiant de la compétition est invalide ou manquant.");
    }
    

  }

    loadEpreuves(): void {
    this.EpreuveService.getAllEpreuvesbyCompetitionId(this.idc).subscribe({
      next: (res) => {
        this.epreuves = res.data;
        console.log('EPREUVES REAL : ',this.epreuves);
      }
    });
      

    //-------------------Epreuves----------------//
  //   this.ide = this.route.snapshot.paramMap.get('ide');
  //   const idNumberE = this.ide !== null ? Number(this.ide) : null;
  //   if (idNumberE !== null && !isNaN(idNumberE)) {
  //     this.EpreuveService.getEpreuvesById(idNumberE).subscribe(data => {
  //       console.log('Voici les données récupérer : ', data);
        
  //       const epreuve: import('../services/epreuves.service').Epreuve = {
  //         epreuve_id: data.data.epreuve_id,
  //         epreuve_name: data.data.epreuve_name,
  //         epreuve_description: data.data.epreuve_description,
  //         epreuve_materiels: data.data.epreuve_materiels,
  //         competition_id: data.data.competition_id,
  //         juge_id: data.data.juge_id,
  //         notation_type: data.data.notation_type
  //       };

  //       this.epreuve_id = epreuve.epreuve_id;
  //       this.epreuve_name = epreuve.epreuve_name;
  //       this.epreuve_description = epreuve.epreuve_description;
  //       this.epreuve_materiels = epreuve.epreuve_materiels;
  //       this.competition_id = epreuve.competition_id;
  //       this.notation_type = epreuve.notation_type;
  //       this.juge_id = epreuve.juge_id;

  //       //update du champ updateData
  //       this.updatedDataE = epreuve;
  //       console.log(this.epreuve_id );
  //     });
  //   } else {
  //     console.error("L'identifiant de l'épreuve est invalide ou manquant.");
    //   }
  }

  // Ajouter une nouvelle épreuve
  addNewEpreuve(epreuve: Epreuve): void {
    ///MODIFIER POUR GETALLEPREUVES (récupération pour idEpreuve)
    this.EpreuveService.getAllEpreuvesbyCompetitionId(this.idc).subscribe({
      next: (res) => {
        this.epreuveData = res;
        this.epreuve_id = this.epreuveData.length;
        console.log('Toutes les épreuves récupérées :', res);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des épreuves :', err);
      }
    });

    console.log('Ajout nouvelle Epreuve');
    const epreuveToAdd = {
        epreuve_name: epreuve.epreuve_name,
        epreuve_description: epreuve.epreuve_description,
        epreuve_materiels: epreuve.epreuve_materiels,
        competition_id: this.competition.length + 1,
        notation_type: 1,
        juge_id: 1
      };

      this.EpreuveService.createEpreuve(epreuveToAdd).subscribe({
        next: (response: any) => {
          console.log('Nouvelle épreuve ajoutée:', response);
          // Réinitialiser le formulaire
          this.newEpreuve = {
            epreuve_name: '',
            epreuve_date: '',
            epreuve_status: ''
          };
          // Recharger la liste des épreuves
          this.loadEpreuves();
        },
        error: (error: any) => {
          console.error('Erreur lors de l\'ajout de l\'épreuve:', error);
        }
      });
    
  }

  // Méthode pour ajouter une nouvelle compétitions
  addNewCompetition(): void {
    if (this.newCompetition.competition_nom && this.newCompetition.competition_date && this.newCompetition.competition_location && this.newCompetition.competition_statut) {
      console.log('Tentative d\'ajout de compétition:', this.newCompetition);
      this.CompetitionService.CreateCompetition(this.newCompetition).subscribe({
        next: (response: any) => {
          console.log('Nouvelle compétition ajoutée :', response);
          this.router.navigate(['/listecompetitions']);
        },
        error: (error: any) => {
          console.error('Erreur lors de l\'ajout de la compétition :', error);
          alert('Erreur lors de la création de la compétition');
        }
      });
    } else {
      alert('Veuillez remplir tous les champs obligatoires');
    }
    console.log('Tentative d\'ajout de nouvelle épreuve');
    // Pour chaque épreuve temporaire dans ListEpreuvesTemp, on l'ajoute via le service
    for (let epreuve of this.ListEpreuvesTemp) {
      this.addNewEpreuve(epreuve);
    }
  }

  // Méthode pour supprimer une epreuve
  // deleteEpreuve(epreuveId: number): void {
  //   if (confirm('Êtes-vous sûr de vouloir supprimer cette épreuve ?')) {
  //     this.EpreuveService.deleteEpreuve(epreuveId).subscribe(
  //       (response) => {
  //         console.log('Épreuve supprimée:', response);
  //         // Recharger la liste des épreuves
  //         this.loadEpreuves();
  //       },
  //       (error) => {
  //         console.error('Erreur lors de la suppression de l\'épreuve:', error);
  //       }
  //     );
  //   }
  // }
  
    //-------------------MAJ----------------//
  async updateCompetition() {
      //Compétitions Update
    console.log('Avant mise à jour - competition_location:', this.competition_location);
    this.updatedDataC.competition_nom = this.competition_nom;
    this.updatedDataC.competition_date = this.competition_date;
    this.updatedDataC.competition_location = this.competition_location;
    this.updatedDataC.competition_statut = this.competition_statut;
    console.log('Après mise à jour - updatedDataC:', this.updatedDataC);
    this.CompetitionService.UpdateCompetition(Number(this.idc), this.updatedDataC).subscribe({
      next: (data) => {
        console.log('Réponse de l\'API:', data);
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour:', error);
      }
    });

    //Epreuves Update
      console.log('EPREUVE : ' ,this.updatedDataE);
        // On parcourt toutes les épreuves pour les mettre à jour une par une
        for (let epreuve of this.epreuves) {
            let updatedEpreuve = {
                epreuve_id: epreuve.epreuve_id,
                epreuve_name: epreuve.epreuve_name,
                epreuve_description: epreuve.epreuve_description,
                epreuve_materiels: epreuve.epreuve_materiels,
                competition_id: epreuve.competition_id,
                notation_type: epreuve.notation_type,
                juge_id: epreuve.juge_id
            };
            this.EpreuveService.UpdateEpreuve(Number(epreuve.epreuve_id), updatedEpreuve).subscribe({
                next: (data) => {
                    console.log('Mise à jour de l\'épreuve :', data);
                },
                error: (error) => {
                    console.error('Erreur lors de la mise à jour de l\'épreuve :', error);
                }
            });
        }
        await new Promise(resolve => setTimeout(resolve, 1000)); // pause de 1 seconde pour laisser le temps d'effectuer les requêtes avant de récupérer la liste des compétitions
        this.router.navigate(['//competitions', this.competition_id, 'epreuves']);
    
  }
  
  // Méthode appelée quand nbEpreuves change
  onNbEpreuvesChange(): void {
    this.initializeEpreuvesTemp();
  }

  // Méthode pour sauvegarder toutes les nouvelles epreuves
  // saveNewEpreuves(): void {
  //   console.log('Sauvegarde de', this.ListEpreuvesTemp.length, 'nouvelles épreuves');
    
  //   // Vérifier que toutes les épreuves ont des données valides
  //   const validEpreuves = this.ListEpreuvesTemp.filter(epreuve => 
  //     epreuve.epreuve_name && epreuve.epreuve_description && epreuve.epreuve_materiels
  //   );
    
  //   if (validEpreuves.length !== this.ListEpreuvesTemp.length) {
  //     alert('Veuillez remplir tous les champs pour toutes les épreuves');
  //     return;
  //   }
    
  //   // Sauvegardé chaques épreuves
  //   let savedCount = 0;
  //   validEpreuves.forEach(epreuve => {
  //     const epreuveToAdd = {
  //       epreuve_name: epreuve.epreuve_name,
  //       epreuve_description: epreuve.epreuve_description,
  //       epreuve_materiels: epreuve.epreuve_materiels,
  //       competition_id: this.competition.length + 1,
  //       notation_type: 1,
  //       juge_id: 1
  //     };
      
  //     this.EpreuveService.createEpreuve(epreuveToAdd).subscribe(
  //       (response: any) => {
  //         console.log('Épreuve sauvegardée:', response);
  //         savedCount++;
          
  //         // Si toutes les épreuves sont sauvegardées, rediriger
  //         if (savedCount === validEpreuves.length) {
  //           alert('Toutes les épreuves ont été sauvegardées avec succès !');
  //           this.router.navigate(['/competitions', this.idc, 'epreuves']);
  //         }
  //       },
  //       (error: any) => {
  //         console.error('Erreur lors de la sauvegarde de l\'épreuve:', error);
  //         alert('Erreur lors de la sauvegarde d\'une épreuve');
  //       }
  //     );
  //   });
  //}
}
