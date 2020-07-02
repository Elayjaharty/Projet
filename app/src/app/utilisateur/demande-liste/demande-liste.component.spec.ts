import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeListeComponent } from './demande-liste.component';

describe('DemandeListeComponent', () => {
  let component: DemandeListeComponent;
  let fixture: ComponentFixture<DemandeListeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandeListeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
