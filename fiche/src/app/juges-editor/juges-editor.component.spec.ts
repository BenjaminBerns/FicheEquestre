import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JugesEditorComponent } from './juges-editor.component';

describe('JugesEditorComponent', () => {
  let component: JugesEditorComponent;
  let fixture: ComponentFixture<JugesEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JugesEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JugesEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
