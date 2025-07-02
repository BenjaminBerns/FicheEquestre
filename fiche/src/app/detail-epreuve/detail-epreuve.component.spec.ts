import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailEpreuveComponent } from './detail-epreuve.component';

describe('DetailEpreuveComponent', () => {
  let component: DetailEpreuveComponent;
  let fixture: ComponentFixture<DetailEpreuveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailEpreuveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailEpreuveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
