import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VonatokComponent } from './vonatok.component';

describe('VonatokComponent', () => {
  let component: VonatokComponent;
  let fixture: ComponentFixture<VonatokComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VonatokComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VonatokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
