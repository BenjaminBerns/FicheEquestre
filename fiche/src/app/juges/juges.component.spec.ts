import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JugesComponent } from './juges.component';

describe('JugesComponent', () => {
  let component: JugesComponent;
  let fixture: ComponentFixture<JugesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JugesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JugesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
