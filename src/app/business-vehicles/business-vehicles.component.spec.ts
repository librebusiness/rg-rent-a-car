import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessVehiclesComponent } from './business-vehicles.component';

describe('BusinessVehiclesComponent', () => {
  let component: BusinessVehiclesComponent;
  let fixture: ComponentFixture<BusinessVehiclesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessVehiclesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessVehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
