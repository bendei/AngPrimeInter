import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GyakorlasComponent } from './gyakorlas.component';

describe('GyakorlasComponent', () => {
  let component: GyakorlasComponent;
  let fixture: ComponentFixture<GyakorlasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GyakorlasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GyakorlasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
