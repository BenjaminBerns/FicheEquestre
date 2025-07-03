import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailJugeComponent } from './detail-juge.component';

describe('DetailJugeComponent', () => {
  let component: DetailJugeComponent;
  let fixture: ComponentFixture<DetailJugeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailJugeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailJugeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
