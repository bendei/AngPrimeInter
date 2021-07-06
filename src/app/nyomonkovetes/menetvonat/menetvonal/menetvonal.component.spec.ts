import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenetvonalComponent } from './menetvonal.component';

describe('MenetvonalComponent', () => {
  let component: MenetvonalComponent;
  let fixture: ComponentFixture<MenetvonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenetvonalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenetvonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
