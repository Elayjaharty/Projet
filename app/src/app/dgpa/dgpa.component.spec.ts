import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DgpaComponent } from './dgpa.component';

describe('DgpaComponent', () => {
  let component: DgpaComponent;
  let fixture: ComponentFixture<DgpaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DgpaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DgpaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
