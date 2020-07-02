import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DgeComponent } from './dge.component';

describe('DgeComponent', () => {
  let component: DgeComponent;
  let fixture: ComponentFixture<DgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
