import { Component, OnInit } from '@angular/core';
import { CavaliersService, Cavalier } from '../services/cavaliers.service';
import { FormsModule, NgModel } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-cavaliers',
  templateUrl: './cavaliers.component.html',
  styleUrls: ['./cavaliers.component.css'],
  imports : [FormsModule, NgFor]
})
export class CavaliersComponent implements OnInit {
  cavaliers: Cavalier[] = [];
  selectedCavalier: Partial<Cavalier> = {};
  isEditing = false;

  constructor(private cavaliersService: CavaliersService) {}

  ngOnInit(): void {
    this.loadCavaliers();
  }

  loadCavaliers(): void {
    this.cavaliersService.getAllCavaliers().subscribe(data => this.cavaliers = data);
  }

  addCavalier(): void {
    const newCavalier: Cavalier = {
      ...this.selectedCavalier,
      cavalier_id: Date.now()
    } as Cavalier;

    this.cavaliersService.addCavalier(newCavalier).subscribe(() => {
      this.cavaliers.push(newCavalier);
      this.selectedCavalier = {};
    });
  }

  editCavalier(cav: Cavalier): void {
    this.selectedCavalier = { ...cav };
    this.isEditing = true;
  }

  updateCavalier(): void {
    this.cavaliersService.updateCavalier(this.selectedCavalier as Cavalier).subscribe(updated => {
      if (updated) {
        const index = this.cavaliers.findIndex(c => c.cavalier_id === updated.cavalier_id);
        this.cavaliers[index] = updated;
      }
      this.cancelEdit();
    });
  }

  deleteCavalier(id: number): void {
    this.cavaliersService.deleteCavalier(id).subscribe(success => {
      if (success) {
        this.cavaliers = this.cavaliers.filter(c => c.cavalier_id !== id);
      }
    });
  }

  cancelEdit(): void {
    this.selectedCavalier = {};
    this.isEditing = false;
  }
}
