import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DgaComponent } from './dga.component';

describe('DgaComponent', () => {
  let component: DgaComponent;
  let fixture: ComponentFixture<DgaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DgaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DgaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
