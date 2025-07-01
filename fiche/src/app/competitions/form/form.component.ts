import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { CompetitionService, Competition } from '../../services/competition.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  form: FormGroup;
  isEdit = false;
  competitionId?: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: CompetitionService
  ) {
    this.form = this.fb.group({
      nom: ['', Validators.required],
      date: ['', Validators.required],
      statut: ['', Validators.required],
      location: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.isEdit = !!id;

    if (this.isEdit && id) {
      this.competitionId = +id;
      this.service.getCompetitionByToken(this.competitionId).subscribe(data => {
        if (data) {
          this.form.patchValue(data);
        }
      });
    }
  }

  onSubmit(): void {
  //   if (this.form.invalid) return;

  //   const values = this.form.value;
  //   if (this.isEdit && this.competitionId) {
  //     this.service.updateCompetition(this.competitionId, values).subscribe(() => {
  //       this.router.navigate(['/']);
  //     });
  //   } else {
  //     this.service.addCompetition(values).subscribe(() => {
  //       this.router.navigate(['/']);
  //     });
  //   }
  }
}
