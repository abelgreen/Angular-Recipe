import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavorateComponent } from './favorate.component';

describe('FavorateComponent', () => {
  let component: FavorateComponent;
  let fixture: ComponentFixture<FavorateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavorateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavorateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
