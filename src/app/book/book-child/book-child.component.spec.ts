import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookChildComponent } from './book-child.component';

describe('BookChildComponent', () => {
  let component: BookChildComponent;
  let fixture: ComponentFixture<BookChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookChildComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
