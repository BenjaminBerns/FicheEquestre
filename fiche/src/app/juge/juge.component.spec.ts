import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JugeComponent } from './juge.component';

describe('JugeComponent', () => {
  let component: JugeComponent;
  let fixture: ComponentFixture<JugeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JugeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JugeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
