import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphsWithSocketComponent } from './graphs-with-socket.component';

describe('GraphsWithSocketComponent', () => {
  let component: GraphsWithSocketComponent;
  let fixture: ComponentFixture<GraphsWithSocketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphsWithSocketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphsWithSocketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
