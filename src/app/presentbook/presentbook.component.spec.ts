import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentbookComponent } from './presentbook.component';

describe('PresentbookComponent', () => {
  let component: PresentbookComponent;
  let fixture: ComponentFixture<PresentbookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresentbookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
