import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionJugeComponent } from './competition-juge.component';

describe('CompetitionJugeComponent', () => {
  let component: CompetitionJugeComponent;
  let fixture: ComponentFixture<CompetitionJugeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompetitionJugeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompetitionJugeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
