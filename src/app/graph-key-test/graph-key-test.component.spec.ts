import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphKeyTestComponent } from './graph-key-test.component';

describe('GraphKeyTestComponent', () => {
  let component: GraphKeyTestComponent;
  let fixture: ComponentFixture<GraphKeyTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphKeyTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphKeyTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
