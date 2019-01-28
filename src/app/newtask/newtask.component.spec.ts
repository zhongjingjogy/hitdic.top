import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewtaskComponent } from './newtask.component';

describe('NewtaskComponent', () => {
  let component: NewtaskComponent;
  let fixture: ComponentFixture<NewtaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewtaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewtaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
