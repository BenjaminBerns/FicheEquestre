import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpreuveEditorComponent } from './epreuve-editor.component';

describe('EpreuveEditorComponent', () => {
  let component: EpreuveEditorComponent;
  let fixture: ComponentFixture<EpreuveEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EpreuveEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EpreuveEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
