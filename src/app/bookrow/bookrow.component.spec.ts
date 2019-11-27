import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookrowComponent } from './bookrow.component';

describe('BookrowComponent', () => {
  let component: BookrowComponent;
  let fixture: ComponentFixture<BookrowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookrowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
