import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VonatComponent } from './vonat.component';

describe('VonatComponent', () => {
  let component: VonatComponent;
  let fixture: ComponentFixture<VonatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VonatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VonatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
