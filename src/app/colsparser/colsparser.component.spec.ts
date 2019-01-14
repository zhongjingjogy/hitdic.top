import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColsparserComponent } from './colsparser.component';

describe('ColsparserComponent', () => {
  let component: ColsparserComponent;
  let fixture: ComponentFixture<ColsparserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColsparserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColsparserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
