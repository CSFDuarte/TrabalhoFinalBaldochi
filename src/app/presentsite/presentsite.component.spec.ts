import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentsiteComponent } from './presentsite.component';

describe('PresentsiteComponent', () => {
  let component: PresentsiteComponent;
  let fixture: ComponentFixture<PresentsiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresentsiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentsiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
