import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeAllOrdersComponent } from './see-all-orders.component';

describe('SeeAllOrdersComponent', () => {
  let component: SeeAllOrdersComponent;
  let fixture: ComponentFixture<SeeAllOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeeAllOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeAllOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
