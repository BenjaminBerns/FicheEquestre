import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortailAppComponent } from './portail-app.component';

describe('PortailAppComponent', () => {
  let component: PortailAppComponent;
  let fixture: ComponentFixture<PortailAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortailAppComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortailAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
