import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OdersComponent } from './oders.component';

describe('OdersComponent', () => {
  let component: OdersComponent;
  let fixture: ComponentFixture<OdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
